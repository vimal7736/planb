"use client";

import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";

interface AdvancedBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (date: Date, time: string, duration: number, size: string) => void;
}

const TATTOO_SIZES = [
  { id: "small", name: "Small / Minimal", duration: 1, description: "approx 1-2 inches" },
  { id: "medium", name: "Medium / Palm Size", duration: 3, description: "approx 3-5 inches" },
  { id: "large", name: "Large / Half Sleeve", duration: 6, description: "approx 6+ inches" },
];

const WORKING_HOURS = [
  "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", 
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"
];

type Booking = {
  preferred_date: string;
  preferred_time: string;
  estimated_duration: string | number;
  status: string;
};

export default function AdvancedBookingModal({ isOpen, onClose, onConfirm }: AdvancedBookingModalProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedSize, setSelectedSize] = useState(TATTOO_SIZES[0]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // Store real bookings
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      fetchMonthBookings(currentMonth);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, currentMonth]);

  const fetchMonthBookings = async (date: Date) => {
    const startDate = new Date(date.getFullYear(), date.getMonth() - 1, 1).toISOString();
    const endDate = new Date(date.getFullYear(), date.getMonth() + 2, 0).toISOString();

    const { data, error } = await supabase
      .from('bookings')
      .select('preferred_date, preferred_time, estimated_duration, status')
      .gte('preferred_date', startDate)
      .lte('preferred_date', endDate)
      .in('status', ['pending', 'approved']); // Ignore rejected/completed if you want them to be free

    if (!error && data) {
      setBookings(data as Booking[]);
    }
  };

  const getBookedSlotsForDate = (date: Date) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const dayBookings = bookings.filter(b => b.preferred_date === dateStr);
    
    const blockedSlots: string[] = [];
    
    dayBookings.forEach(booking => {
      if (!booking.preferred_time) return;
      
      const startIndex = WORKING_HOURS.indexOf(booking.preferred_time);
      if (startIndex === -1) return;
      
      // Handle duration which might be stored as string or number
      const duration = parseInt(booking.estimated_duration as string) || 1;
      
      for (let i = 0; i < duration; i++) {
        if (startIndex + i < WORKING_HOURS.length) {
          blockedSlots.push(WORKING_HOURS[startIndex + i]);
        }
      }
    });
    
    return blockedSlots;
  };

  // When date changes, reset time selection
  useEffect(() => {
    if (selectedDate) {
      setSelectedTime(null);
    }
  }, [selectedDate, selectedSize]);

  // Calendar logic
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const padding = Array.from({ length: firstDay }, (_, i) => i);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Calculate available time slots based on duration
  const availableTimes = useMemo(() => {
    if (!selectedDate) return [];

    const available: { time: string; isAvailable: boolean }[] = [];
    const duration = selectedSize.duration;
    const bookedSlots = getBookedSlotsForDate(selectedDate);

    WORKING_HOURS.forEach((time, i) => {
      // Check if we have enough consecutive open slots starting from this time
      let canFit = true;
      for (let j = 0; j < duration; j++) {
        const checkTimeIndex = i + j;
        if (checkTimeIndex >= WORKING_HOURS.length) {
          canFit = false; // Runs past closing time
          break;
        }
        if (bookedSlots.includes(WORKING_HOURS[checkTimeIndex])) {
          canFit = false; // Slot is booked
          break;
        }
      }
      available.push({ time, isAvailable: canFit });
    });

    return available;
  }, [selectedDate, bookings, selectedSize]);

  if (!isOpen) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      onConfirm(selectedDate, selectedTime, selectedSize.duration, selectedSize.name);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity animate-in fade-in duration-300" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-background-alt border border-primary/20 rounded-3xl shadow-[0_0_80px_rgba(85,107,47,0.15)] w-full max-w-5xl h-[85vh] md:h-[75vh] flex flex-col overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-primary/10 relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
          
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-black tracking-tight">Select Appointment</h2>
            <p className="opacity-70 text-sm mt-1">Plan B Studio • Kozhikode</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-background/50 hover:bg-primary/20 rounded-full transition-colors z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Step 1: Size & Calendar */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 border-r border-primary/10 custom-scrollbar">
            
            {/* Tattoo Size Selection */}
            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary/80 mb-4">1. Select Tattoo Size</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {TATTOO_SIZES.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selectedSize.id === size.id 
                        ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(85,107,47,0.2)]" 
                        : "border-primary/20 hover:border-primary/40 bg-background/50"
                    }`}
                  >
                    <div className="font-serif font-bold text-lg mb-1">{size.name}</div>
                    <div className="text-xs opacity-70 mb-2">{size.description}</div>
                    <div className="text-[10px] uppercase tracking-wider font-semibold bg-background-alt inline-block px-2 py-1 rounded-md opacity-80">
                      {size.duration} {size.duration === 1 ? 'Hour' : 'Hours'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Calendar */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary/80 mb-4">2. Select Date</h3>
              
              <div className="bg-background/50 rounded-2xl border border-primary/10 p-5 md:p-6">
                <div className="flex items-center justify-between mb-6">
                  <button 
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                    className="p-2 hover:bg-primary/10 rounded-full transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
                  </button>
                  <h4 className="font-serif text-lg font-bold tracking-wide">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </h4>
                  <button 
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                    className="p-2 hover:bg-primary/10 rounded-full transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center mb-2">
                  {dayNames.map(day => (
                    <div key={day} className="text-xs font-semibold uppercase tracking-wider text-primary opacity-80 py-1">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2 text-center">
                  {padding.map(p => (
                    <div key={`empty-${p}`} className="p-2" />
                  ))}
                  {days.map(day => {
                    const dateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                    const isPast = dateObj < today;
                    
                    // To show completely booked days in UI, we check real slots
                    const dayBookedSlots = getBookedSlotsForDate(dateObj);
                    const isFullyBooked = dayBookedSlots.length >= WORKING_HOURS.length;
                    const isDisabled = isPast || isFullyBooked;

                    const isSelected = selectedDate && 
                      selectedDate.getDate() === day && 
                      selectedDate.getMonth() === currentMonth.getMonth() && 
                      selectedDate.getFullYear() === currentMonth.getFullYear();

                    return (
                      <button
                        key={day}
                        disabled={isDisabled}
                        onClick={() => setSelectedDate(dateObj)}
                        className={`
                          p-2 w-10 h-10 md:w-12 md:h-12 mx-auto rounded-full text-sm font-medium transition-all relative flex items-center justify-center
                          ${isDisabled ? "opacity-30 cursor-not-allowed" : "hover:bg-primary/20 hover:text-primary"}
                          ${isSelected ? "bg-primary text-background shadow-md scale-110" : ""}
                        `}
                      >
                        {day}
                        {isFullyBooked && !isPast && (
                          <div className="absolute -bottom-1 w-1 h-1 bg-red-500 rounded-full"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
                
                <div className="mt-6 flex items-center gap-4 justify-center text-xs opacity-70">
                   <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-primary"></div> Selected</div>
                   <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500"></div> Fully Booked</div>
                </div>
              </div>
            </div>

          </div>

          {/* Step 2: Time Slots */}
          <div className="md:w-80 p-6 md:p-8 bg-background/30 overflow-y-auto custom-scrollbar flex flex-col">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary/80 mb-4">
              3. Select Time
            </h3>

            {!selectedDate ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 px-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 mb-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" /></svg>
                <p>Please select a date from the calendar to view available time slots.</p>
              </div>
            ) : (
              <>
                <p className="font-serif text-lg mb-6">
                  {monthNames[selectedDate.getMonth()]} {selectedDate.getDate()}, {selectedDate.getFullYear()}
                </p>
                
                <div className="space-y-3 flex-1">
                  {availableTimes.map(({ time, isAvailable }) => (
                    <button
                      key={time}
                      disabled={!isAvailable}
                      onClick={() => setSelectedTime(time)}
                      className={`
                        w-full p-4 rounded-xl text-center transition-all border font-medium flex items-center justify-between
                        ${!isAvailable 
                          ? "opacity-40 cursor-not-allowed border-dashed border-primary/20 bg-background/10" 
                          : selectedTime === time
                            ? "bg-primary text-background shadow-lg scale-105 border-primary"
                            : "border-primary/20 hover:border-primary/50 hover:bg-primary/5"}
                      `}
                    >
                      <span>{time}</span>
                      {!isAvailable && <span className="text-[10px] uppercase tracking-widest opacity-70">Booked</span>}
                    </button>
                  ))}
                  
                  {availableTimes.every(t => !t.isAvailable) && (
                    <div className="text-center py-8 text-sm opacity-70">
                      No slots available for a {selectedSize.duration}-hour session on this day. Please select another date.
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-primary/10">
                  <button
                    disabled={!selectedTime}
                    onClick={handleConfirm}
                    className="w-full py-4 bg-primary text-background rounded-xl font-bold tracking-widest uppercase hover:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-xl shadow-primary/20"
                  >
                    Confirm Selection
                  </button>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
