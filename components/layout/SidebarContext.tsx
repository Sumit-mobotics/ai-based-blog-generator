'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PublicUser } from '@/types';

interface SidebarContextValue {
  mobileOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  user: PublicUser | null;
  refreshUser: () => void;
}

const SidebarContext = createContext<SidebarContextValue>({
  mobileOpen: false,
  openSidebar: () => {},
  closeSidebar: () => {},
  user: null,
  refreshUser: () => {},
});

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<PublicUser | null>(null);

  async function refreshUser() {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (data.user) setUser(data.user);
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        mobileOpen,
        openSidebar: () => setMobileOpen(true),
        closeSidebar: () => setMobileOpen(false),
        user,
        refreshUser,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
