'use client';

import { useState } from 'react';
import { Wand2, Sparkles } from 'lucide-react';
import { GeneratorForm } from '@/components/generator/GeneratorForm';
import { ContentOutput } from '@/components/generator/ContentOutput';
import { Header } from '@/components/layout/Header';
import { useSidebar } from '@/components/layout/SidebarContext';
import { ContentGeneration, Tone } from '@/types';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/Spinner';

const LOADING_MESSAGES = [
  'Crafting your blog post…',
  'Writing Twitter thread…',
  'Composing Instagram caption…',
  'Drafting LinkedIn post…',
  'Creating ad copy…',
  'Polishing final output…',
];

const PLATFORM_TYPES = ['Blog Post', 'Twitter Thread', 'Instagram Caption', 'LinkedIn Post', 'Facebook Ad', 'Google Ad'];

export default function DashboardPage() {
  const { openSidebar, user, refreshUser } = useSidebar();
  const [generation, setGeneration] = useState<ContentGeneration | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);
  const [error, setError] = useState('');

  const generationsLeft =
    user?.plan === 'free' ? Math.max(0, 10 - (user.generationsCount ?? 0)) : undefined;

  async function handleGenerate(data: { prompt: string; tone: Tone; audience: string }) {
    setIsLoading(true);
    setError('');
    setGeneration(null);

    let msgIndex = 0;
    const msgInterval = setInterval(() => {
      msgIndex = (msgIndex + 1) % LOADING_MESSAGES.length;
      setLoadingMsg(LOADING_MESSAGES[msgIndex]);
    }, 1800);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? 'Something went wrong. Please try again.');
        toast.error(json.error ?? 'Generation failed');
        return;
      }

      setGeneration(json.generation);
      await refreshUser();
      toast.success('Content generated successfully!');
    } catch {
      const msg = 'Network error. Please check your connection.';
      setError(msg);
      toast.error(msg);
    } finally {
      clearInterval(msgInterval);
      setIsLoading(false);
      setLoadingMsg(LOADING_MESSAGES[0]);
    }
  }

  return (
    <>
      <Header
        title="Content Generator"
        subtitle="Turn any idea into compelling content for 6 platforms"
        onMenuClick={openSidebar}
      />

      <main className="flex-1 overflow-y-auto p-4 lg:p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <GeneratorForm
            onGenerate={handleGenerate}
            isLoading={isLoading}
            generationsLeft={generationsLeft}
          />

          {/* Loading state */}
          {isLoading && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 flex flex-col items-center justify-center gap-5 animate-fade-in">
              <div className="relative">
                {/* Outer ring */}
                <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-violet-500/20 to-violet-600/20 flex items-center justify-center">
                  <Sparkles className="w-9 h-9 text-violet-600 animate-sparkle" />
                </div>
                {/* Spinning ring */}
                <div className="absolute -inset-1 rounded-3xl border-2 border-violet-500/20 border-t-violet-500 animate-spin" style={{ animationDuration: '1.5s' }} />
              </div>
              <div className="text-center space-y-1.5">
                <p className="text-base font-semibold text-slate-900 animate-fade-in" key={loadingMsg}>
                  {loadingMsg}
                </p>
                <p className="text-sm text-slate-500">Claude AI is working its magic…</p>
              </div>
              <div className="flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-violet-400 animate-float"
                    style={{ animationDelay: `${i * 200}ms`, animationDuration: '1.2s' }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Error state */}
          {error && !isLoading && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center animate-scale-in">
              <p className="text-sm font-medium text-red-700">{error}</p>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && !generation && !error && (
            <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 flex flex-col items-center justify-center gap-4 text-center animate-fade-in">
              <div className="w-16 h-16 bg-linear-to-br from-violet-50 to-violet-100 rounded-2xl flex items-center justify-center animate-float">
                <Wand2 className="w-8 h-8 text-violet-400" />
              </div>
              <div>
                <p className="text-base font-medium text-slate-700">Your content will appear here</p>
                <p className="text-sm text-slate-500 mt-1">
                  Enter a topic above and click &quot;Generate Content&quot; to get started.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-1">
                {PLATFORM_TYPES.map((type, i) => (
                  <span
                    key={type}
                    className="text-xs px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-500 rounded-full font-medium animate-scale-in"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Generated content */}
          {generation && !isLoading && (
            <div className="animate-slide-up">
              <ContentOutput content={generation.content} />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
