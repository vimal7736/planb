"use client";

import { useState, useRef, useEffect } from "react";

interface Props {
  id?: string;
  required?: boolean;
}

export default function CustomDateTimePicker({ id, required }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const padding = Array.from({ length: firstDay }, (_, i) => i);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(newDate);
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const times = [
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", 
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", 
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM"
  ];

  const formattedValue = selectedDate 
    ? `${monthNames[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()} ${selectedTime ? `at ${selectedTime}` : ''}`
    : "";

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Hidden input to hold the actual value for the form */}
      <input 
        type="text" 
        id={id} 
        required={required}
        value={formattedValue}
        onChange={() => {}}
        className="sr-only" 
      />

      {/* Custom Input Display */}
      <div 
        onClick={toggleOpen}
        className={`w-full px-3 py-2 md:px-4 md:py-2.5 bg-transparent border-2 rounded-lg md:rounded-xl cursor-pointer transition-all flex items-center justify-between text-sm ${
          isOpen ? "border-primary shadow-[0_0_15px_rgba(85,107,47,0.2)]" : "border-primary/20 hover:border-primary/50"
        }`}
      >
        <span className={`${formattedValue ? "text-foreground" : "text-foreground/50"}`}>
          {formattedValue || "Select Date & Time"}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
        </svg>
      </div>

      {/* Popover */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full md:w-[380px] bg-background-alt border border-primary/20 rounded-2xl shadow-2xl z-[100] p-4 md:p-5 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex flex-col md:flex-row gap-5 md:gap-6">
            
            {/* Calendar Section */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <button 
                  type="button" 
                  onClick={handlePrevMonth}
                  className="p-1.5 hover:bg-primary/10 rounded-full transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
                </button>
                <h3 className="font-serif text-base font-bold tracking-wide">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <button 
                  type="button" 
                  onClick={handleNextMonth}
                  className="p-1.5 hover:bg-primary/10 rounded-full transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center mb-1">
                {dayNames.map(day => (
                  <div key={day} className="text-[10px] font-semibold uppercase tracking-wider text-primary opacity-80 py-1">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-0.5 text-center">
                {padding.map(p => (
                  <div key={`empty-${p}`} className="p-1" />
                ))}
                {days.map(day => {
                  const isSelected = selectedDate && 
                    selectedDate.getDate() === day && 
                    selectedDate.getMonth() === currentMonth.getMonth() && 
                    selectedDate.getFullYear() === currentMonth.getFullYear();

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDateSelect(day)}
                      className={`p-1 w-7 h-7 md:w-8 md:h-8 mx-auto rounded-full text-xs font-medium transition-all ${
                        isSelected 
                          ? "bg-primary text-background shadow-md scale-110" 
                          : "hover:bg-primary/20 hover:text-primary"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px bg-primary/10"></div>

            {/* Time Section */}
            <div className="md:w-28 flex flex-col border-t md:border-t-0 border-primary/10 pt-3 md:pt-0">
              <h4 className="font-serif text-xs font-bold tracking-widest uppercase mb-3 text-center md:text-left text-primary">
                Time
              </h4>
              <div className="h-52 overflow-y-auto pr-1 space-y-1 custom-scrollbar">
                {times.map(time => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`w-full py-1.5 px-2 text-xs rounded-lg transition-all text-center md:text-left ${
                      selectedTime === time
                        ? "bg-primary text-background shadow-md"
                        : "hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
