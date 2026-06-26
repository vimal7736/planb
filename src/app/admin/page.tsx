"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, Clock } from "lucide-react";

type Booking = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  placement: string;
  description: string;
  reference_image_url: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  estimated_duration: string | null;
  estimated_size: string | null;
  status: string;
};

export default function AdminDashboard() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, [currentMonth]);

  const fetchBookings = async () => {
    setLoading(true);
    // Fetch all bookings for current month and surrounding months to cover calendar overlap
    const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1).toISOString();
    const endDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 2, 0).toISOString();

    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .gte('preferred_date', startDate)
      .lte('preferred_date', endDate)
      .order('preferred_date', { ascending: true })
      .order('preferred_time', { ascending: true });
      
    if (error) console.error("Error fetching bookings:", error);
    else if (data) setBookings(data as Booking[]);
    setLoading(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from('bookings').update({ status: newStatus }).eq('id', id);
    if (error) alert("Error updating status: " + error.message);
    else {
      // Optimistic update
      setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
    }
  };

  // Calendar logic
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const padding = Array.from({ length: firstDay }, (_, i) => i);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Helper to format date string for comparison
  const getDateString = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const selectedDateString = getDateString(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
  
  // Bookings for selected date
  const selectedDayBookings = bookings.filter(b => b.preferred_date === selectedDateString);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'approved': return "bg-[#5C6B40] text-[#F9FAEC]";
      case 'rejected': return "bg-red-900/10 text-red-800";
      default: return "bg-[#E2E6CC] text-[#4A5D33]"; // pending
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-[#F0F2DF]/50 p-4 rounded-lg border border-[#E2E6CC] backdrop-blur-sm shadow-sm mb-4">
        <div>
          <h1 className="text-xl font-bold font-serif text-[#2C331F] mb-0.5">Booking Calendar</h1>
          <p className="text-[10px] text-[#6B7A50] uppercase tracking-widest">Manage your schedule</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Calendar Widget (Left Side) */}
        <div className="lg:col-span-7 bg-[#FCFDF7] border border-[#E2E6CC] rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold font-serif text-[#2C331F]">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            <div className="flex gap-1">
              <button 
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="p-1 hover:bg-[#E2E6CC] rounded text-[#4A5D33] transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="p-1 hover:bg-[#E2E6CC] rounded text-[#4A5D33] transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {dayNames.map(day => (
              <div key={day} className="text-[9px] font-bold text-[#6B7A50] uppercase tracking-wider py-1">
                {day}
              </div>
            ))}
          </div>

          {loading ? (
            <div className="py-12 text-center text-[10px] text-[#6B7A50] uppercase tracking-widest">Loading...</div>
          ) : (
            <div className="grid grid-cols-7 gap-1">
              {padding.map(i => (
                <div key={`empty-${i}`} className="aspect-square bg-transparent rounded-md"></div>
              ))}
              
              {days.map(day => {
                const dateStr = getDateString(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                const dayBookings = bookings.filter(b => b.preferred_date === dateStr);
                const isSelected = selectedDate.getDate() === day && selectedDate.getMonth() === currentMonth.getMonth() && selectedDate.getFullYear() === currentMonth.getFullYear();
                const isToday = new Date().getDate() === day && new Date().getMonth() === currentMonth.getMonth() && new Date().getFullYear() === currentMonth.getFullYear();

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
                    className={`aspect-square flex flex-col justify-start items-center p-1 rounded-md transition-all border ${
                      isSelected 
                        ? 'border-[#5C6B40] bg-[#F0F2DF] shadow-inner' 
                        : 'border-transparent hover:border-[#E2E6CC] hover:bg-[#F9FAEC]'
                    }`}
                  >
                    <span className={`text-[10px] font-bold ${
                      isSelected ? 'text-[#2C331F]' : isToday ? 'text-[#4A5D33]' : 'text-[#6B7A50]'
                    }`}>
                      {day}
                    </span>
                    
                    {/* Booking Indicators */}
                    <div className="flex gap-0.5 mt-1 flex-wrap justify-center">
                      {dayBookings.slice(0, 3).map((b, idx) => (
                        <div key={idx} className={`w-1.5 h-1.5 rounded-full ${
                          b.status === 'approved' ? 'bg-[#5C6B40]' : 
                          b.status === 'rejected' ? 'bg-red-400' : 'bg-[#C1C999]'
                        }`}></div>
                      ))}
                      {dayBookings.length > 3 && <span className="text-[6px] text-[#6B7A50] font-bold leading-none">+</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Daily Schedule (Right Side) */}
        <div className="lg:col-span-5 bg-[#FCFDF7] border border-[#E2E6CC] rounded-lg shadow-sm flex flex-col h-[500px]">
          <div className="p-3 border-b border-[#E2E6CC] bg-[#F0F2DF]/50">
            <h3 className="text-xs font-bold font-serif text-[#2C331F]">
              Schedule for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {selectedDayBookings.length === 0 ? (
              <div className="text-center py-12 text-[10px] text-[#6B7A50] uppercase tracking-widest">
                No bookings for this date
              </div>
            ) : (
              selectedDayBookings.map(booking => (
                <div key={booking.id} className="border border-[#E2E6CC] rounded-md p-3 bg-white shadow-sm space-y-2">
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs font-bold text-[#2C331F]">{booking.name}</div>
                      <div className="text-[9px] text-[#6B7A50] flex items-center gap-1 mt-0.5">
                        <Clock size={10} /> {booking.preferred_time} ({booking.estimated_duration}hrs)
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="bg-[#F9FAEC] p-2 rounded text-[10px] text-[#4A5D33] border border-[#E2E6CC]/50">
                    <span className="font-bold">Placement:</span> {booking.placement} &bull; <span className="font-bold">Size:</span> {booking.estimated_size}
                  </div>
                  
                  <p className="text-[10px] text-[#6B7A50] line-clamp-2">{booking.description}</p>
                  <p className="text-[9px] text-[#6B7A50]">{booking.phone} &bull; {booking.email}</p>

                  <div className="flex gap-2 pt-2 border-t border-[#E2E6CC]/50">
                    {booking.status !== 'approved' && (
                      <button 
                        onClick={() => updateStatus(booking.id, 'approved')}
                        className="flex items-center gap-1 px-2 py-1 bg-[#5C6B40] hover:bg-[#4A5D33] text-[#F9FAEC] rounded text-[9px] font-bold uppercase tracking-widest transition-colors"
                      >
                        <CheckCircle size={10} /> Approve
                      </button>
                    )}
                    {booking.status !== 'rejected' && (
                      <button 
                        onClick={() => updateStatus(booking.id, 'rejected')}
                        className="flex items-center gap-1 px-2 py-1 bg-[#FCFDF7] hover:bg-red-50 border border-[#E2E6CC] text-[#6B7A50] hover:text-red-700 rounded text-[9px] font-bold uppercase tracking-widest transition-colors"
                      >
                        <XCircle size={10} /> Reject
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
