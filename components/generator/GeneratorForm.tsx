'use client';

import { useState } from 'react';
import { Wand2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import { Tone } from '@/types';

const TONES: { value: Tone; label: string; description: string }[] = [
  { value: 'professional', label: 'Professional', description: 'Authoritative and polished' },
  { value: 'casual', label: 'Casual', description: 'Friendly and conversational' },
  { value: 'humorous', label: 'Humorous', description: 'Fun and entertaining' },
  { value: 'inspirational', label: 'Inspirational', description: 'Uplifting and motivating' },
  { value: 'educational', label: 'Educational', description: 'Informative and clear' },
  { value: 'persuasive', label: 'Persuasive', description: 'Compelling and action-driven' },
];

const EXAMPLE_PROMPTS = [
  'The future of remote work and how companies can build thriving distributed teams',
  '5 reasons why every entrepreneur should start a morning routine today',
  'How AI is revolutionizing healthcare diagnostics in 2025',
  'The ultimate guide to sustainable living without sacrificing comfort',
];

interface GeneratorFormProps {
  onGenerate: (data: { prompt: string; tone: Tone; audience: string }) => void;
  isLoading: boolean;
  generationsLeft?: number;
}

export function GeneratorForm({ onGenerate, isLoading, generationsLeft }: GeneratorFormProps) {
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState<Tone>('professional');
  const [audience, setAudience] = useState('');
  const [toneOpen, setToneOpen] = useState(false);

  const selectedTone = TONES.find((t) => t.value === tone)!;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (prompt.trim().length < 10 || !audience.trim()) return;
    onGenerate({ prompt: prompt.trim(), tone, audience: audience.trim() });
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-slate-900">What do you want to write about?</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Enter your topic and we&apos;ll generate content for 6 platforms instantly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Prompt */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">Topic / Prompt</label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. The benefits of meditation for busy professionals..."
            rows={4}
            maxLength={1000}
            className="resize-none"
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400">{prompt.length} / 1000 characters</p>
            {prompt.length < 10 && prompt.length > 0 && (
              <p className="text-xs text-amber-500">Need at least 10 characters</p>
            )}
          </div>
        </div>

        {/* Example prompts */}
        <div>
          <p className="text-xs text-slate-500 mb-2 font-medium">Try an example:</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_PROMPTS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPrompt(p)}
                className="text-xs px-3 py-1.5 rounded-full bg-violet-50 text-violet-700 hover:bg-violet-100 transition-colors text-left"
              >
                {p.length > 50 ? p.slice(0, 50) + '…' : p}
              </button>
            ))}
          </div>
        </div>

        {/* Settings row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Tone selector */}
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1.5">Tone</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setToneOpen(!toneOpen)}
                className={cn(
                  'w-full h-10 flex items-center justify-between px-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-900',
                  'hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors'
                )}
              >
                <span className="font-medium">{selectedTone.label}</span>
                <ChevronDown className={cn('w-4 h-4 text-slate-400 transition-transform', toneOpen && 'rotate-180')} />
              </button>

              {toneOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 z-10 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
                  {TONES.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => { setTone(t.value); setToneOpen(false); }}
                      className={cn(
                        'w-full flex flex-col items-start px-3 py-2.5 text-left hover:bg-slate-50 transition-colors',
                        tone === t.value && 'bg-violet-50'
                      )}
                    >
                      <span className={cn('text-sm font-medium', tone === t.value ? 'text-violet-700' : 'text-slate-900')}>
                        {t.label}
                      </span>
                      <span className="text-xs text-slate-500">{t.description}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Target audience */}
          <Input
            label="Target Audience"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            placeholder="e.g. Small business owners, 25-45"
            maxLength={200}
          />
        </div>

        {/* Generate button */}
        <div className="flex items-center justify-between pt-1">
          {generationsLeft !== undefined && (
            <p className="text-xs text-slate-500">
              <span className="font-medium text-slate-700">{generationsLeft}</span> generations remaining today
            </p>
          )}
          <Button
            type="submit"
            size="lg"
            loading={isLoading}
            disabled={prompt.trim().length < 10 || !audience.trim()}
            className="ml-auto"
          >
            <Wand2 className="w-4 h-4" />
            {isLoading ? 'Generating…' : 'Generate Content'}
          </Button>
        </div>
      </form>
    </div>
  );
}
