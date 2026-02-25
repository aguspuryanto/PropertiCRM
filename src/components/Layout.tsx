import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  MessageSquare, 
  CalendarDays, 
  MapPin, 
  BarChart3, 
  Menu,
  X,
  Bell,
  Calculator,
  FileText
} from 'lucide-react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'properties', label: 'Properti & Listing', icon: Building2 },
    { id: 'leads', label: 'Leads & Pipeline', icon: Users },
    { id: 'valuation', label: 'Valuasi Properti', icon: Calculator },
    { id: 'documents', label: 'Dokumen', icon: FileText },
    { id: 'messages', label: 'Pesan & WhatsApp', icon: MessageSquare },
    { id: 'schedule', label: 'Jadwal & Tugas', icon: CalendarDays },
    { id: 'agents', label: 'Agen & Lokasi', icon: MapPin },
    { id: 'reports', label: 'Laporan', icon: BarChart3 },
  ];

  // Simple router replacement for demo purposes
  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsSidebarOpen(false);
    // Dispatch a custom event to change the view in App.tsx
    window.dispatchEvent(new CustomEvent('navigate', { detail: id }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <Building2 className="w-6 h-6 text-emerald-400 mr-2" />
          <span className="text-xl font-bold tracking-tight">PropertiCRM</span>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={cn(
                "w-full flex items-center px-4 py-3 rounded-lg transition-colors text-sm font-medium",
                activeTab === item.id 
                  ? "bg-emerald-600 text-white" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
          <div className="flex items-center">
            <img 
              src="https://i.pravatar.cc/150?u=admin" 
              alt="Admin" 
              className="w-10 h-10 rounded-full border-2 border-slate-700"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Admin Utama</p>
              <p className="text-xs text-slate-500">admin@properticrm.id</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8">
          <button 
            className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-md"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex-1 px-4 lg:px-8">
            <h1 className="text-lg font-semibold text-slate-800 capitalize">
              {navItems.find(n => n.id === activeTab)?.label || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
