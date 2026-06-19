"use client";

import { useState } from "react";
import { Search, Filter, Eye, CheckCircle, XCircle } from "lucide-react";

// Mock Data for Phase 2 UI
const MOCK_BOOKINGS = [
  { id: "1", name: "Jane Doe", email: "jane@example.com", date: "Oct 15", placement: "Forearm", status: "pending" },
  { id: "2", name: "Alex Smith", email: "alex@example.com", date: "Oct 18", placement: "Ribs", status: "approved" },
  { id: "3", name: "Sam Wilson", email: "sam@example.com", date: "Nov 2", placement: "Ankle", status: "rejected" },
  { id: "4", name: "Taylor Swift", email: "taylor@example.com", date: "Nov 10", placement: "Collarbone", status: "pending" },
];

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved': return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Approved</span>;
      case 'rejected': return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">Rejected</span>;
      default: return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">Pending</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-serif text-gray-900">Booking Requests</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
        <Search size={20} className="text-gray-400" />
        <input 
          type="text" 
          placeholder="Search bookings by name or email..." 
          className="flex-1 bg-transparent outline-none text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
              <th className="p-4 font-medium">Client Info</th>
              <th className="p-4 font-medium">Requested Date</th>
              <th className="p-4 font-medium">Placement</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {MOCK_BOOKINGS.filter(b => b.name.toLowerCase().includes(searchTerm.toLowerCase())).map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4">
                  <div className="font-medium text-gray-900">{booking.name}</div>
                  <div className="text-gray-500 text-xs">{booking.email}</div>
                </td>
                <td className="p-4 text-gray-600">{booking.date}</td>
                <td className="p-4 text-gray-600">{booking.placement}</td>
                <td className="p-4">{getStatusBadge(booking.status)}</td>
                <td className="p-4 flex justify-end gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                    <Eye size={18} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Approve">
                    <CheckCircle size={18} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Reject">
                    <XCircle size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {MOCK_BOOKINGS.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">No booking requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
