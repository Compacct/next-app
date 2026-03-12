"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  Building2, 
  GraduationCap, 
  Bell, 
  Menu,
  ChevronLeft,
  MapPin,
  BookOpen,
  Clock,
  MessageSquare,
  Megaphone,
  ShieldCheck,
  CheckCircle,
  Image as ImageIcon,
  Quote
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const isAdmin = session?.user?.role === "admin";

  const menuGroups = isAdmin 
    ? [
        {
          title: "Site Manager",
          items: [
            { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
            { name: "News & Notices", href: "/dashboard/admin/news", icon: Bell },
            { name: "Banners", href: "/dashboard/admin/banners", icon: ImageIcon },
            { name: "Master States", href: "/dashboard/admin/states", icon: MapPin },
          ]
        },
        {
          title: "Master",
          items: [
            { name: "Subject Master", href: "/dashboard/admin/subjects", icon: BookOpen },
            { name: "Session Master", href: "/dashboard/admin/sessions", icon: Clock },
            { name: "Courses", href: "/dashboard/admin/courses", icon: GraduationCap },
          ]
        },
        {
          title: "Franchisee",
          items: [
            { name: "Franchisees", href: "/dashboard/admin/franchisees", icon: Building2 },
            { name: "Enquiries", href: "/dashboard/admin/enquiries", icon: MessageSquare },
            { name: "Center News", href: "/dashboard/admin/franchisee-news", icon: Megaphone },
            { name: "Center Docs", href: "/dashboard/admin/franchisee-docs", icon: ShieldCheck },
          ]
        },
        {
          title: "Enrollment",
          items: [
            { name: "Pending Enroll", href: "/dashboard/admin/enrollments-pending", icon: Clock },
            { name: "Confirmed Enroll", href: "/dashboard/admin/enrollments-confirmed", icon: CheckCircle },
          ]
        },
        {
          title: "Result",
          items: [
            { name: "Student Results", href: "/dashboard/admin/results", icon: GraduationCap },
          ]
        },
        {
          title: "Others",
          items: [
            { name: "Feedback", href: "/dashboard/admin/feedback", icon: Quote },
            { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
          ]
        }
      ]
    : [
        {
          title: "Main",
          items: [
            { name: "Dashboard", href: "/dashboard/franchisee", icon: LayoutDashboard },
            { name: "Enroll Students", href: "/dashboard/franchisee/enrollments", icon: Users },
            { name: "Profile", href: "/dashboard/franchisee/profile", icon: Settings },
          ]
        }
      ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col z-40 transition-all duration-300"
      >
        <div className="p-6 flex items-center justify-between shrink-0">
          {isSidebarOpen && (
            <span className="text-xl font-bold text-blue-600">WBCA Panel</span>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-xl transition-all"
          >
            {isSidebarOpen ? <ChevronLeft /> : <Menu />}
          </button>
        </div>

        <nav className="flex-grow px-4 space-y-6 mt-4 overflow-y-auto custom-scrollbar pb-10">
          {menuGroups.map((group) => (
            <div key={group.title} className="space-y-2">
              {isSidebarOpen && (
                <h3 className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{group.title}</h3>
              )}
              <div className="space-y-1">
                {group.items.map((item: any) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-4 px-4 py-3 rounded-2xl font-bold transition-all group ${
                      pathname === item.href
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <item.icon className={`w-5 h-5 shrink-0 ${pathname === item.href ? "" : "group-hover:text-blue-600"}`} />
                    {isSidebarOpen && <span className="truncate">{item.name}</span>}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 shrink-0">
          <button 
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center gap-4 px-4 py-4 text-red-500 font-bold hover:bg-red-50 rounded-2xl transition-all"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col min-h-screen">
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between z-30">
          <div className="flex items-center gap-4">
            <h2 className="font-bold text-slate-800 hidden md:block">
              {isAdmin ? "Administrator Area" : "Franchisee Portal"}
            </h2>
          </div>
          <div className="flex items-center gap-6">
             <button className="relative p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
             </button>
             <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
                <div className="text-right hidden sm:block">
                   <p className="text-sm font-bold text-gray-900 leading-none">{session?.user?.name}</p>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{session?.user?.role}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                   {session?.user?.name?.charAt(0)}
                </div>
             </div>
          </div>
        </header>

        <main className="p-8 flex-grow">
          {children}
        </main>
      </div>
    </div>
  );
}
