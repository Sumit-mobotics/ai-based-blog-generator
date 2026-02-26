'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ general: data.error });
        toast.error(data.error);
        return;
      }

      toast.success(`Welcome back, ${data.user.name}!`);
      router.push('/dashboard');
      router.refresh();
    } catch {
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-violet-950 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-[20%] w-80 h-80 bg-violet-600/20 rounded-full blur-[90px] animate-orb-1" />
        <div className="absolute bottom-1/4 right-[15%] w-72 h-72 bg-pink-600/14 rounded-full blur-[70px] animate-orb-2" />
        <div className="absolute top-[65%] left-[55%] w-56 h-56 bg-indigo-600/12 rounded-full blur-[60px] animate-orb-3" />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid-dark pointer-events-none" />

      <div className="w-full max-w-md relative animate-slide-up" style={{ animationDelay: '50ms' }}>
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group">
            <div className="w-10 h-10 bg-linear-to-br from-violet-500 to-violet-700 rounded-xl flex items-center justify-center shadow-xl shadow-violet-500/40 animate-glow-pulse transition-transform duration-200 group-hover:scale-105">
              <Sparkles className="w-5 h-5 text-white animate-sparkle" />
            </div>
            <span className="text-xl font-bold text-white">ContentAI</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-slate-400 mt-1 text-sm">Sign in to continue creating</p>
        </div>

        {/* Card with glow border */}
        <div className="relative">
          <div className="absolute -inset-px bg-linear-to-b from-violet-500/20 via-transparent to-transparent rounded-[1.25rem] pointer-events-none" />
          <div className="relative bg-white rounded-2xl shadow-2xl shadow-black/40 p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {errors.general && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 text-center animate-scale-in">
                  {errors.general}
                </div>
              )}

              <Input
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                error={errors.email}
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="h-10 w-full rounded-xl border border-slate-300 bg-white px-3 pr-10 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent hover:border-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
              </div>

              <Button type="submit" size="lg" loading={isLoading} className="w-full">
                Sign in
              </Button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-6">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-violet-600 font-medium hover:text-violet-700 transition-colors">
                Create one free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
