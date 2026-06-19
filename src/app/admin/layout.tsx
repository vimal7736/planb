import { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, Users, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-[#FAF8F5]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#556B2F]/10 flex flex-col">
        <div className="p-6 border-b border-[#556B2F]/10">
          <Link href="/" className="text-xl font-bold font-serif tracking-widest text-[#556B2F] uppercase block">
            PLAN B
          </Link>
          <span className="text-xs font-sans text-gray-500 uppercase tracking-wider font-semibold mt-1 block">Admin Panel</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-[#556B2F]/5 text-[#556B2F] rounded-lg font-medium transition-colors">
            <LayoutDashboard size={20} />
            Bookings
          </Link>
          <Link href="/admin/clients" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-[#556B2F]/5 hover:text-[#556B2F] rounded-lg font-medium transition-colors">
            <Users size={20} />
            Clients
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-[#556B2F]/5 hover:text-[#556B2F] rounded-lg font-medium transition-colors">
            <Settings size={20} />
            Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-[#556B2F]/10">
          <button className="flex w-full items-center gap-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg font-medium transition-colors">
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
}
