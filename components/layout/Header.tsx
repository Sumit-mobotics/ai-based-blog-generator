'use client';

import { Menu, Sparkles } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onMenuClick: () => void;
}

export function Header({ title, subtitle, onMenuClick }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center px-4 lg:px-6 shrink-0 relative">
      {/* Subtle bottom gradient accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-violet-200/60 to-transparent" />

      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all duration-200 mr-3"
        aria-label="Toggle sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-2 lg:hidden mr-4">
        <div className="w-7 h-7 bg-linear-to-br from-violet-500 to-violet-700 rounded-lg flex items-center justify-center shadow-md shadow-violet-500/20">
          <Sparkles className="w-3.5 h-3.5 text-white animate-sparkle" />
        </div>
      </div>

      <div>
        <h1 className="text-lg font-semibold text-slate-900 leading-tight">{title}</h1>
        {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
      </div>
    </header>
  );
}
