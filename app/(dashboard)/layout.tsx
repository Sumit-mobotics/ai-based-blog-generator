'use client';

import { SidebarProvider, useSidebar } from '@/components/layout/SidebarContext';
import { Sidebar } from '@/components/layout/Sidebar';

function DashboardShell({ children }: { children: React.ReactNode }) {
  const { mobileOpen, closeSidebar, user } = useSidebar();

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar user={user} mobileOpen={mobileOpen} onClose={closeSidebar} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardShell>{children}</DashboardShell>
    </SidebarProvider>
  );
}
