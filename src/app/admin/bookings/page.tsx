"use client";

import { useState, useEffect } from "react";
import { supabase, Booking } from "@/lib/supabase";
import { CheckCircle, Clock, Trash2, Calendar, MapPin, Search, LayoutGrid, List } from "lucide-react";
import Image from "next/image";

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'reviewed' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('table');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchTerm]);

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

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBookings = filteredBookings.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-gray-900 mb-2">Booking Requests</h1>
          <p className="text-gray-500">Review and manage client tattoo requests.</p>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md flex items-center justify-center transition-colors ${viewMode === 'table' ? 'bg-[#FCFDF7] shadow-sm text-primary' : 'text-gray-500 hover:text-gray-900'}`}
              title="Table View"
            >
              <List size={18} />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-md flex items-center justify-center transition-colors ${viewMode === 'cards' ? 'bg-[#FCFDF7] shadow-sm text-primary' : 'text-gray-500 hover:text-gray-900'}`}
              title="Card View"
            >
              <LayoutGrid size={18} />
            </button>
          </div>
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
            className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-primary bg-[#FCFDF7]"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-gray-500 bg-[#FCFDF7] rounded-xl border border-dashed border-gray-300">
          Loading booking requests...
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="p-12 text-center text-gray-500 bg-[#FCFDF7] rounded-xl border border-dashed border-gray-300">
          No bookings found.
        </div>
      ) : viewMode === 'cards' ? (
        <div className="space-y-4">
          {paginatedBookings.map((booking) => (
            <div key={booking.id} className="bg-[#FCFDF7] rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row gap-6">
              
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
                  className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-red-600 bg-[#FCFDF7] hover:bg-red-50 border border-red-200 rounded transition-colors"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#FCFDF7] rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Details</th>
                  <th className="px-6 py-4">Preference</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{booking.name}</div>
                      <div className="text-sm text-gray-500">{booking.email}</div>
                      {booking.phone && <div className="text-sm text-gray-500">{booking.phone}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 line-clamp-1 max-w-[200px]" title={booking.description}>{booking.description}</div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <MapPin size={10} /> {booking.placement}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.preferred_date ? new Date(booking.preferred_date).toLocaleDateString() : 'Flexible'}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {booking.preferred_time || 'Any time'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        booking.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                        booking.status === 'reviewed' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <select
                          value={booking.status}
                          onChange={(e) => updateStatus(booking.id, e.target.value as any)}
                          className="border border-gray-200 rounded px-2 py-1 text-xs bg-[#FCFDF7] focus:outline-none focus:border-primary"
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="completed">Completed</option>
                        </select>
                        
                        <button
                          onClick={() => handleDelete(booking.id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      {filteredBookings.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#FCFDF7] p-4 rounded-xl shadow-sm border border-gray-200 mt-4">
          <span className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredBookings.length)} of {filteredBookings.length} entries
          </span>
          <div className="flex gap-1 flex-wrap justify-center">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-50 text-gray-700 transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, i) => {
              // Simple pagination logic to show max 5 pages
              if (
                totalPages <= 5 || 
                i === 0 || 
                i === totalPages - 1 || 
                (i >= currentPage - 2 && i <= currentPage)
              ) {
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1.5 text-xs font-medium border rounded-md transition-colors ${
                      currentPage === i + 1 
                        ? 'bg-[#5C6B40] text-[#F9FAEC] border-[#5C6B40]' 
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              } else if (
                i === 1 && currentPage > 3 || 
                i === totalPages - 2 && currentPage < totalPages - 2
              ) {
                return <span key={i} className="px-2 py-1.5 text-gray-400">...</span>;
              }
              return null;
            })}
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-50 text-gray-700 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
