'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Eye, EyeOff, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'sonner';

const PASSWORD_RULES = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'At least one letter', test: (p: string) => /[a-zA-Z]/.test(p) },
  { label: 'At least one number', test: (p: string) => /\d/.test(p) },
];

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const passwordStrength = PASSWORD_RULES.filter((r) => r.test(password)).length;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (passwordStrength < 2) {
      setError('Please choose a stronger password.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        toast.error(data.error);
        return;
      }

      toast.success(`Account created! Welcome, ${data.user.name}!`);
      router.push('/dashboard');
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-violet-950 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] right-[18%] w-80 h-80 bg-violet-600/18 rounded-full blur-[90px] animate-orb-1" />
        <div className="absolute bottom-[20%] left-[12%] w-72 h-72 bg-pink-600/13 rounded-full blur-[70px] animate-orb-2" />
        <div className="absolute top-[60%] right-[50%] w-56 h-56 bg-indigo-600/12 rounded-full blur-[60px] animate-orb-3" />
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
          <h1 className="text-2xl font-bold text-white">Start for free</h1>
          <p className="text-slate-400 mt-1 text-sm">10 free AI content generations included</p>
        </div>

        {/* Card with glow border */}
        <div className="relative">
          <div className="absolute -inset-px bg-linear-to-b from-violet-500/20 via-transparent to-transparent rounded-[1.25rem] pointer-events-none" />
          <div className="relative bg-white rounded-2xl shadow-2xl shadow-black/40 p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 text-center animate-scale-in">
                  {error}
                </div>
              )}

              <Input
                label="Full name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Smith"
                autoComplete="name"
                required
                minLength={2}
              />

              <Input
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    autoComplete="new-password"
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

                {password.length > 0 && (
                  <div className="space-y-1.5 mt-1 animate-fade-in">
                    {/* Strength bar */}
                    <div className="flex gap-1">
                      {[1, 2, 3].map((level) => (
                        <div
                          key={level}
                          className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                            passwordStrength >= level
                              ? level === 3
                                ? 'bg-emerald-500'
                                : level === 2
                                ? 'bg-amber-400'
                                : 'bg-red-400'
                              : 'bg-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="space-y-1">
                      {PASSWORD_RULES.map((rule) => (
                        <div key={rule.label} className="flex items-center gap-1.5">
                          <Check
                            className={`w-3 h-3 transition-colors duration-200 ${rule.test(password) ? 'text-emerald-500' : 'text-slate-300'}`}
                          />
                          <span className={`text-xs transition-colors duration-200 ${rule.test(password) ? 'text-emerald-600' : 'text-slate-400'}`}>
                            {rule.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Button type="submit" size="lg" loading={isLoading} className="w-full">
                Create free account
              </Button>

              <p className="text-center text-xs text-slate-400">
                By creating an account you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>

            <p className="text-center text-sm text-slate-500 mt-5">
              Already have an account?{' '}
              <Link href="/login" className="text-violet-600 font-medium hover:text-violet-700 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
