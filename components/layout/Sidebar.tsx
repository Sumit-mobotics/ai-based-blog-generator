'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  History,
  LogOut,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PublicUser } from '@/types';
import { toast } from 'sonner';
import UpgradeModal from '@/components/payment/UpgradeModal';
import { useSidebar } from '@/components/layout/SidebarContext';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/history', label: 'History', icon: History },
];

interface SidebarProps {
  user: PublicUser | null;
  mobileOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ user, mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { refreshUser } = useSidebar();
  const [showUpgrade, setShowUpgrade] = useState(false);

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch {
      toast.error('Failed to log out. Please try again.');
    }
  }

  return (
    <>
      {showUpgrade && user && (
        <UpgradeModal
          userName={user.name}
          userEmail={user.email}
          onClose={() => setShowUpgrade(false)}
          onSuccess={() => {
            setShowUpgrade(false);
            refreshUser();
          }}
        />
      )}
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-30 h-full w-64 flex flex-col transition-transform duration-300',
          'lg:relative lg:translate-x-0 lg:z-auto',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        style={{ background: 'linear-gradient(180deg, #0f172a 0%, #0d1424 100%)' }}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-violet-500/50 to-transparent" />

        {/* Logo */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/6">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-linear-to-br from-violet-500 to-violet-700 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/30 transition-all duration-200 group-hover:shadow-violet-500/50 group-hover:scale-105">
              <Sparkles className="w-4 h-4 text-white animate-sparkle" />
            </div>
            <span className="font-bold text-sm tracking-tight text-white">ContentAI</span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/8 transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-linear-to-r from-violet-600 to-violet-700 text-white shadow-lg shadow-violet-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/6'
                )}
              >
                <Icon className={cn('w-4 h-4 shrink-0 transition-transform duration-200', isActive && 'scale-110')} />
                {label}
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User info & logout */}
        <div className="px-3 pb-4 border-t border-white/6 pt-4">
          {user && (
            <div className="px-3 mb-3 py-2 rounded-xl bg-white/4 border border-white/6">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-linear-to-br from-violet-500/30 to-violet-600/30 border border-violet-500/20 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-violet-300">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate leading-tight">{user.name}</p>
                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="inline-flex items-center rounded-full bg-violet-900/60 border border-violet-500/20 px-2 py-0.5 text-xs font-medium text-violet-300 capitalize">
                  {user.plan} plan
                </span>
                {user.plan === 'free' && (
                  <span className="text-xs text-slate-500">
                    {user.generationsCount}/10 used
                  </span>
                )}
              </div>
              {user.plan === 'free' && (
                <button
                  onClick={() => setShowUpgrade(true)}
                  className="mt-2.5 w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 transition-colors text-xs font-medium text-white"
                >
                  <Zap className="w-3 h-3" />
                  Upgrade to Pro — ₹499
                </button>
              )}
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/6 transition-all duration-200"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
