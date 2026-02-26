'use client';

import { useState } from 'react';
import { Copy, Check, FileText, Twitter, Instagram, Linkedin, Megaphone, Search } from 'lucide-react';
import { GeneratedContent, ContentTab } from '@/types';
import { cn, copyToClipboard, countWords } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { toast } from 'sonner';

interface ContentOutputProps {
  content: GeneratedContent;
}

const TABS: { id: ContentTab; label: string; icon: React.ElementType }[] = [
  { id: 'blog', label: 'Blog Post', icon: FileText },
  { id: 'twitter', label: 'Twitter', icon: Twitter },
  { id: 'instagram', label: 'Instagram', icon: Instagram },
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { id: 'facebook', label: 'Facebook Ad', icon: Megaphone },
  { id: 'google', label: 'Google Ad', icon: Search },
];

function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await copyToClipboard(text);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200',
        copied
          ? 'bg-emerald-100 text-emerald-700 scale-95'
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:scale-95 active:scale-90'
      )}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copied!' : label}
    </button>
  );
}

function BlogTab({ content }: { content: GeneratedContent['blogPost'] }) {
  const fullText = [
    content.title,
    content.metaDescription,
    content.intro,
    ...content.sections.flatMap((s) => [s.heading, s.content]),
    content.conclusion,
  ].join('\n\n');

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <Badge variant="violet" className="mb-2">Blog Post</Badge>
          <h2 className="text-2xl font-bold text-slate-900 leading-snug">{content.title}</h2>
        </div>
        <CopyButton text={fullText} label="Copy All" />
      </div>

      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
        <p className="text-xs font-medium text-slate-500 mb-1">Meta Description</p>
        <p className="text-sm text-slate-700">{content.metaDescription}</p>
        <p className="text-xs text-slate-400 mt-1">{content.metaDescription.length} / 160 chars</p>
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Introduction</p>
        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{content.intro}</p>
      </div>

      {content.sections.map((section, i) => (
        <div key={i} className="border-l-2 border-violet-200 pl-4">
          <h3 className="text-base font-semibold text-slate-900 mb-2">{section.heading}</h3>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{section.content}</p>
        </div>
      ))}

      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Conclusion</p>
        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{content.conclusion}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {content.tags.map((tag) => (
          <Badge key={tag} variant="default">#{tag}</Badge>
        ))}
      </div>

      <p className="text-xs text-slate-400">{countWords(fullText)} words</p>
    </div>
  );
}

function TwitterTab({ content }: { content: GeneratedContent['twitterThread'] }) {
  const allTweets = content.tweets.join('\n\n');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Badge variant="blue">Twitter / X Thread · {content.tweets.length} tweets</Badge>
        <CopyButton text={allTweets} label="Copy All" />
      </div>
      {content.tweets.map((tweet, i) => (
        <div key={i} className="flex gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 transition-all duration-200 hover:border-slate-300 hover:shadow-sm">
          <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
            {i + 1}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-800 leading-relaxed">{tweet}</p>
            <div className="flex items-center justify-between mt-2">
              <p className={cn('text-xs', tweet.length > 270 ? 'text-red-500' : 'text-slate-400')}>
                {tweet.length} / 280
              </p>
              <CopyButton text={tweet} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function InstagramTab({ content }: { content: GeneratedContent['instagramCaption'] }) {
  const hashtagString = content.hashtags.map((h) => `#${h}`).join(' ');
  const fullPost = `${content.caption}\n\n${hashtagString}`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Badge variant="amber">Instagram Caption</Badge>
        <CopyButton text={fullPost} label="Copy All" />
      </div>

      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-line flex-1">
            {content.caption}
          </p>
          <CopyButton text={content.caption} label="Copy" />
        </div>
        <p className="text-xs text-slate-400">{content.caption.length} characters</p>
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Hashtags ({content.hashtags.length})
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {content.hashtags.map((tag) => (
            <span key={tag} className="text-sm text-violet-600 font-medium">#{tag}</span>
          ))}
        </div>
        <CopyButton text={hashtagString} label="Copy Hashtags" />
      </div>
    </div>
  );
}

function LinkedInTab({ content }: { content: GeneratedContent['linkedinPost'] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Badge variant="blue">LinkedIn Post</Badge>
        <CopyButton text={content.content} label="Copy" />
      </div>
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
        <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-line">{content.content}</p>
        <p className="text-xs text-slate-400 mt-3">{countWords(content.content)} words · {content.content.length} chars</p>
      </div>
    </div>
  );
}

function FacebookAdTab({ content }: { content: GeneratedContent['facebookAd'] }) {
  const fullAd = `Headline: ${content.headline}\n\n${content.primaryText}\n\nCTA: ${content.cta}`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Badge variant="blue">Facebook Ad</Badge>
        <CopyButton text={fullAd} label="Copy All" />
      </div>

      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 p-4 border-b border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Headline</p>
          <div className="flex items-start justify-between gap-3">
            <p className="text-lg font-bold text-slate-900">{content.headline}</p>
            <CopyButton text={content.headline} />
          </div>
          <p className="text-xs text-slate-400 mt-1">{content.headline.length} / 40 chars</p>
        </div>

        <div className="p-4 border-b border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Primary Text</p>
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm text-slate-800 leading-relaxed flex-1">{content.primaryText}</p>
            <CopyButton text={content.primaryText} />
          </div>
        </div>

        <div className="p-4 bg-violet-50/60">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Call to Action</p>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-4 py-1.5 bg-violet-600 text-white text-sm font-medium rounded-lg shadow-sm shadow-violet-500/30">
              {content.cta}
            </span>
            <CopyButton text={content.cta} />
          </div>
        </div>
      </div>
    </div>
  );
}

function GoogleAdTab({ content }: { content: GeneratedContent['googleAd'] }) {
  const fullAd = [
    'Headlines:',
    ...content.headlines.map((h, i) => `${i + 1}. ${h}`),
    '',
    'Descriptions:',
    ...content.descriptions.map((d, i) => `${i + 1}. ${d}`),
  ].join('\n');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Badge variant="green">Google Ad</Badge>
        <CopyButton text={fullAd} label="Copy All" />
      </div>

      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Headlines (max 30 chars each)</p>
          <div className="space-y-2">
            {content.headlines.map((headline, i) => (
              <div key={i} className="flex items-center justify-between gap-3 p-2 bg-slate-50 rounded-lg transition-colors hover:bg-slate-100">
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-xs text-slate-400 font-medium w-4">{i + 1}</span>
                  <span className="text-sm font-medium text-blue-700">{headline}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn('text-xs', headline.length > 30 ? 'text-red-500' : 'text-slate-400')}>
                    {headline.length}/30
                  </span>
                  <CopyButton text={headline} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Descriptions (max 90 chars each)</p>
          <div className="space-y-2">
            {content.descriptions.map((desc, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-lg transition-colors hover:bg-slate-100">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm text-slate-700 flex-1">{desc}</p>
                  <CopyButton text={desc} />
                </div>
                <p className={cn('text-xs mt-1', desc.length > 90 ? 'text-red-500' : 'text-slate-400')}>
                  {desc.length} / 90 chars
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContentOutput({ content }: ContentOutputProps) {
  const [activeTab, setActiveTab] = useState<ContentTab>('blog');

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Tabs */}
      <div className="border-b border-slate-100 bg-slate-50/80 overflow-x-auto">
        <div className="flex gap-0 min-w-max">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn(
                'flex items-center gap-2 px-4 py-3.5 text-xs font-medium border-b-2 transition-all duration-200 whitespace-nowrap',
                activeTab === id
                  ? 'border-violet-600 text-violet-700 bg-white shadow-[0_1px_0_white]'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-white/60'
              )}
            >
              <Icon className={cn('w-3.5 h-3.5 transition-transform duration-200', activeTab === id && 'scale-110')} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content — key triggers re-mount + fade-in on tab change */}
      <div key={activeTab} className="p-6 animate-fade-in">
        {activeTab === 'blog' && <BlogTab content={content.blogPost} />}
        {activeTab === 'twitter' && <TwitterTab content={content.twitterThread} />}
        {activeTab === 'instagram' && <InstagramTab content={content.instagramCaption} />}
        {activeTab === 'linkedin' && <LinkedInTab content={content.linkedinPost} />}
        {activeTab === 'facebook' && <FacebookAdTab content={content.facebookAd} />}
        {activeTab === 'google' && <GoogleAdTab content={content.googleAd} />}
      </div>
    </div>
  );
}
