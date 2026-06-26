"use client";

import { useState, useEffect } from "react";
import { supabase, Booking } from "@/lib/supabase";
import { CheckCircle, Clock, Trash2, Calendar, MapPin, Search } from "lucide-react";
import Image from "next/image";

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'reviewed' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) console.error("Error fetching bookings:", error);
    else if (data) setBookings(data);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: Booking['status']) => {
    const { error } = await supabase.from('bookings').update({ status }).eq('id', id);
    if (error) {
      alert("Error updating status: " + error.message);
    } else {
      setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking request?")) return;
    const { error } = await supabase.from('bookings').delete().eq('id', id);
    if (error) {
      alert("Error deleting booking: " + error.message);
    } else {
      setBookings(bookings.filter(b => b.id !== id));
    }
  };

  const filteredBookings = bookings.filter(b => {
    if (filter !== 'all' && b.status !== filter) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return b.name.toLowerCase().includes(term) || b.email.toLowerCase().includes(term);
    }
    return true;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-gray-900 mb-2">Booking Requests</h1>
          <p className="text-gray-500">Review and manage client tattoo requests.</p>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search names..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value as any)}
            className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-primary bg-white"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
          Loading booking requests...
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="p-12 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
          No bookings found.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row gap-6">
              
              {/* Left Column: Reference Image (if any) */}
              <div className="w-full md:w-48 shrink-0">
                {booking.reference_image_url ? (
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <Image 
                      src={booking.reference_image_url} 
                      alt="Reference" 
                      fill 
                      className="object-cover" 
                      unoptimized 
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-square rounded-lg bg-gray-50 border border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400">
                    <span className="text-xs font-medium uppercase tracking-widest">No Reference</span>
                  </div>
                )}
              </div>

              {/* Middle Column: Details */}
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold font-serif">{booking.name}</h2>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                      <a href={`mailto:${booking.email}`} className="hover:text-primary transition-colors">{booking.email}</a>
                      {booking.phone && (
                        <>
                          <span>•</span>
                          <a href={`tel:${booking.phone}`} className="hover:text-primary transition-colors">{booking.phone}</a>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    booking.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                    booking.status === 'reviewed' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {booking.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                      <MapPin size={12} /> Placement
                    </p>
                    <p className="text-sm font-medium">{booking.placement}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                      <Calendar size={12} /> Preference
                    </p>
                    <p className="text-sm font-medium">
                      {booking.preferred_date ? new Date(booking.preferred_date).toLocaleDateString() : 'Flexible'} 
                      {booking.preferred_time ? ` at ${booking.preferred_time}` : ''}
                    </p>
                    {booking.estimated_duration && (
                      <p className="text-xs text-gray-500 mt-1">Est: {booking.estimated_duration} hours • {booking.estimated_size}</p>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Description</p>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{booking.description}</p>
                </div>
                
                <p className="text-xs text-gray-400">
                  Received: {new Date(booking.created_at).toLocaleString()}
                </p>
              </div>

              {/* Right Column: Actions */}
              <div className="flex flex-row md:flex-col gap-2 shrink-0 md:w-40 md:border-l md:border-gray-100 md:pl-6">
                <p className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Actions</p>
                
                {booking.status !== 'pending' && (
                  <button 
                    onClick={() => updateStatus(booking.id, 'pending')}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded transition-colors"
                  >
                    <Clock size={14} /> Mark Pending
                  </button>
                )}
                
                {booking.status !== 'reviewed' && (
                  <button 
                    onClick={() => updateStatus(booking.id, 'reviewed')}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded transition-colors"
                  >
                    <CheckCircle size={14} /> Mark Reviewed
                  </button>
                )}
                
                {booking.status !== 'completed' && (
                  <button 
                    onClick={() => updateStatus(booking.id, 'completed')}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 rounded transition-colors"
                  >
                    <CheckCircle size={14} /> Mark Completed
                  </button>
                )}

                <div className="hidden md:block my-2 border-t border-gray-100"></div>

                <button 
                  onClick={() => handleDelete(booking.id)}
                  className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-red-600 bg-white hover:bg-red-50 border border-red-200 rounded transition-colors"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
