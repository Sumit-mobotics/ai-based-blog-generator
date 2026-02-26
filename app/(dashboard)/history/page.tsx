'use client';

import { useState, useEffect, useCallback } from 'react';
import { Trash2, ChevronDown, ChevronUp, Clock, FileText, Twitter, Instagram } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { useSidebar } from '@/components/layout/SidebarContext';
import { ContentOutput } from '@/components/generator/ContentOutput';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { GenerationSummary, ContentGeneration } from '@/types';
import { formatDate, truncate } from '@/lib/utils';
import { toast } from 'sonner';

const TONE_COLORS: Record<string, 'violet' | 'green' | 'amber' | 'blue' | 'red' | 'default'> = {
  professional: 'blue',
  casual: 'green',
  humorous: 'amber',
  inspirational: 'violet',
  educational: 'default',
  persuasive: 'red',
};

interface HistoryItemProps {
  summary: GenerationSummary;
  onDelete: (id: string) => void;
}

function HistoryItem({ summary, onDelete }: HistoryItemProps) {
  const [expanded, setExpanded] = useState(false);
  const [fullData, setFullData] = useState<ContentGeneration | null>(null);
  const [loadingFull, setLoadingFull] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleExpand() {
    if (expanded) {
      setExpanded(false);
      return;
    }

    if (!fullData) {
      setLoadingFull(true);
      try {
        const res = await fetch(`/api/history/${summary.id}`);
        const data = await res.json();
        if (data.generation) setFullData(data.generation);
      } catch {
        toast.error('Failed to load generation details.');
      } finally {
        setLoadingFull(false);
      }
    }

    setExpanded(true);
  }

  async function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    if (!confirm('Delete this generation? This cannot be undone.')) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/history/${summary.id}`, { method: 'DELETE' });
      if (res.ok) {
        onDelete(summary.id);
        toast.success('Generation deleted.');
      } else {
        toast.error('Failed to delete.');
      }
    } catch {
      toast.error('Failed to delete.');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:border-slate-300">
      {/* Summary row */}
      <div className="flex items-start">
        <div
          role="button"
          tabIndex={0}
          onClick={handleExpand}
          onKeyDown={(e) => e.key === 'Enter' && handleExpand()}
          className="flex-1 min-w-0 p-5 hover:bg-slate-50/80 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <Badge variant={TONE_COLORS[summary.tone] ?? 'default'} className="capitalize">
              {summary.tone}
            </Badge>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Clock className="w-3 h-3" />
              {formatDate(summary.createdAt)}
            </span>
          </div>

          <h3 className="text-sm font-semibold text-slate-900 mb-1 line-clamp-1">
            {summary.blogTitle}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2">
            {truncate(summary.prompt, 150)}
          </p>

          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <FileText className="w-3 h-3" /> Blog
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Twitter className="w-3 h-3" /> Thread
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Instagram className="w-3 h-3" /> Caption
            </span>
            <span className="text-xs text-slate-400">+3 more</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 p-5 pl-2">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 disabled:opacity-50"
          >
            {deleting ? <Spinner className="w-4 h-4" /> : <Trash2 className="w-4 h-4" />}
          </button>
          <div className="p-2 rounded-lg text-slate-400">
            {loadingFull ? (
              <Spinner className="w-4 h-4" />
            ) : expanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </div>
      </div>

      {/* Expanded content */}
      {expanded && fullData && (
        <div className="border-t border-slate-100 p-5 animate-slide-up" style={{ animationDuration: '0.3s' }}>
          <div className="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-xs font-medium text-slate-500 mb-1">Original Prompt</p>
            <p className="text-sm text-slate-700">{summary.prompt}</p>
            {summary.audience && (
              <p className="text-xs text-slate-400 mt-1">
                Audience: {summary.audience}
              </p>
            )}
          </div>
          <ContentOutput content={fullData.content} />
        </div>
      )}
    </div>
  );
}

export default function HistoryPage() {
  const { openSidebar } = useSidebar();
  const [generations, setGenerations] = useState<GenerationSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchHistory = useCallback(async () => {
    try {
      const res = await fetch('/api/history');
      const data = await res.json();
      if (data.generations) setGenerations(data.generations);
      else setError('Failed to load history.');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  function handleDelete(id: string) {
    setGenerations((prev) => prev.filter((g) => g.id !== id));
  }

  return (
    <>
      <Header
        title="Content History"
        subtitle={`${generations.length} generation${generations.length !== 1 ? 's' : ''}`}
        onMenuClick={openSidebar}
      />

      <main className="flex-1 overflow-y-auto p-4 lg:p-6">
        <div className="max-w-4xl mx-auto">
          {loading && (
            <div className="flex justify-center py-16">
              <div className="relative">
                <Spinner className="w-8 h-8 text-violet-500" />
                <div className="absolute inset-0 rounded-full blur-md bg-violet-400/20 animate-glow-pulse" />
              </div>
            </div>
          )}

          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center animate-scale-in">
              <p className="text-sm text-red-700">{error}</p>
              <Button variant="outline" size="sm" onClick={fetchHistory} className="mt-3">
                Try again
              </Button>
            </div>
          )}

          {!loading && !error && generations.length === 0 && (
            <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-16 flex flex-col items-center justify-center gap-3 text-center animate-fade-in">
              <div className="w-16 h-16 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center animate-float">
                <Clock className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-base font-medium text-slate-700">No generations yet</p>
              <p className="text-sm text-slate-500">
                Head to the Dashboard and generate your first piece of content.
              </p>
            </div>
          )}

          {!loading && !error && generations.length > 0 && (
            <div className="space-y-4">
              {generations.map((g, i) => (
                <div
                  key={g.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <HistoryItem summary={g} onDelete={handleDelete} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
