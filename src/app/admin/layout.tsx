"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "./login/actions";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Don't show the admin sidebar on the login page itself
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#F9FAEC] text-[#3F4A2E] flex font-sans selection:bg-[#5C6B40]/20">
      
      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-[#F0F2DF] border-b border-[#E2E6CC] flex items-center justify-between px-4 z-50">
        <Link href="/" className="text-lg font-bold font-serif tracking-[0.1em] text-[#2C331F] uppercase">
          PLAN B
        </Link>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-[#4A5D33] hover:bg-[#E2E6CC] rounded-md transition-colors"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside 
        className={`w-52 bg-[#F0F2DF]/95 md:bg-[#F0F2DF]/80 border-r border-[#E2E6CC] flex flex-col fixed h-full z-40 backdrop-blur-md transition-transform duration-300 md:translate-x-0 top-0 pt-14 md:pt-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-[#E2E6CC] hidden md:block">
          <Link href="/" className="text-xl font-bold font-serif tracking-[0.1em] text-[#2C331F] uppercase hover:text-[#5C6B40] transition-colors">
            PLAN B
          </Link>
          <div className="text-[9px] text-[#6B7A50] mt-1 uppercase font-bold tracking-widest">Workspace</div>
        </div>

        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          <div className="text-[9px] font-bold text-[#6B7A50]/70 uppercase tracking-widest mb-1.5 mt-3 px-3">Operations</div>
          
          <Link href="/admin" className="flex items-center gap-3 px-3 py-1.5 text-xs text-[#4A5D33] hover:bg-[#E2E6CC] hover:text-[#2C331F] rounded-md transition-all font-semibold">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            Bookings
          </Link>

          <div className="text-[9px] font-bold text-[#6B7A50]/70 uppercase tracking-widest mb-1.5 mt-5 px-3">Content (CMS)</div>

          <Link href="/admin/content" className="flex items-center gap-3 px-3 py-1.5 text-xs text-[#4A5D33] hover:bg-[#E2E6CC] hover:text-[#2C331F] rounded-md transition-all font-semibold">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            Site Text
          </Link>
          
          <Link href="/admin/services" className="flex items-center gap-3 px-3 py-1.5 text-xs text-[#4A5D33] hover:bg-[#E2E6CC] hover:text-[#2C331F] rounded-md transition-all font-semibold">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            Services
          </Link>
          
          <Link href="/admin/portfolio" className="flex items-center gap-3 px-3 py-1.5 text-xs text-[#4A5D33] hover:bg-[#E2E6CC] hover:text-[#2C331F] rounded-md transition-all font-semibold">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            Portfolio Images
          </Link>

          <div className="text-[9px] font-bold text-[#6B7A50]/70 uppercase tracking-widest mb-1.5 mt-5 px-3">Growth</div>
          
          <Link href="/admin/blog" className="flex items-center gap-3 px-3 py-1.5 text-xs text-[#4A5D33] hover:bg-[#E2E6CC] hover:text-[#2C331F] rounded-md transition-all font-semibold">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
            Journal
          </Link>
          
          <Link href="/admin/reviews" className="flex items-center gap-3 px-3 py-1.5 text-xs text-[#4A5D33] hover:bg-[#E2E6CC] hover:text-[#2C331F] rounded-md transition-all font-semibold">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
            Reviews
          </Link>
        </nav>
        
        <div className="p-3 border-t border-[#E2E6CC] mt-auto space-y-1">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-red-600/70 hover:bg-red-500/10 hover:text-red-700 rounded-md transition-all text-xs font-semibold"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Logout
          </button>
          <Link href="/" className="flex items-center gap-3 px-3 py-2 text-[#6B7A50] hover:bg-[#E2E6CC] hover:text-[#2C331F] rounded-md transition-all text-xs font-semibold">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Website
          </Link>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 md:ml-52 p-4 md:p-6 mt-14 md:mt-0 w-full overflow-x-hidden">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
