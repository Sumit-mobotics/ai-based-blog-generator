import Link from 'next/link';
import {
  Sparkles,
  FileText,
  Twitter,
  Instagram,
  Linkedin,
  Megaphone,
  Search,
  ArrowRight,
  Wand2,
  Zap,
  BarChart3,
  Shield,
  Check,
} from 'lucide-react';

const PLATFORMS = [
  {
    icon: FileText,
    name: 'Blog Post',
    description: 'SEO-optimized long-form articles with title, intro, structured sections, and meta description.',
    iconClass: 'bg-violet-500/20 text-violet-400',
    hoverBorder: 'hover:border-violet-500/40',
    hoverShadow: 'hover:shadow-violet-500/10',
    delay: 0,
  },
  {
    icon: Twitter,
    name: 'Twitter Thread',
    description: 'Engaging multi-tweet threads with a strong hook, insights, and a call-to-action closer.',
    iconClass: 'bg-sky-500/20 text-sky-400',
    hoverBorder: 'hover:border-sky-500/40',
    hoverShadow: 'hover:shadow-sky-500/10',
    delay: 80,
  },
  {
    icon: Instagram,
    name: 'Instagram Caption',
    description: 'Compelling captions with strategic emojis, storytelling, and 12 targeted hashtags.',
    iconClass: 'bg-pink-500/20 text-pink-400',
    hoverBorder: 'hover:border-pink-500/40',
    hoverShadow: 'hover:shadow-pink-500/10',
    delay: 160,
  },
  {
    icon: Linkedin,
    name: 'LinkedIn Post',
    description: 'Professional thought-leadership content designed to drive engagement and authority.',
    iconClass: 'bg-blue-500/20 text-blue-400',
    hoverBorder: 'hover:border-blue-500/40',
    hoverShadow: 'hover:shadow-blue-500/10',
    delay: 240,
  },
  {
    icon: Megaphone,
    name: 'Facebook Ad',
    description: 'High-converting ad copy with attention-grabbing headline, primary text, and CTA.',
    iconClass: 'bg-indigo-500/20 text-indigo-400',
    hoverBorder: 'hover:border-indigo-500/40',
    hoverShadow: 'hover:shadow-indigo-500/10',
    delay: 320,
  },
  {
    icon: Search,
    name: 'Google Ad',
    description: "3 headlines and 2 descriptions, each optimized to Google's character limits.",
    iconClass: 'bg-emerald-500/20 text-emerald-400',
    hoverBorder: 'hover:border-emerald-500/40',
    hoverShadow: 'hover:shadow-emerald-500/10',
    delay: 400,
  },
];

const STEPS = [
  {
    number: '1',
    title: 'Enter your topic',
    description: 'Describe your idea, product, or message in plain English. Add your preferred tone and target audience.',
    icon: Wand2,
    iconClass: 'bg-violet-500/20 text-violet-400',
    shadow: 'shadow-violet-500/20',
    delay: 0,
  },
  {
    number: '2',
    title: 'AI generates everything',
    description: 'Claude AI instantly creates tailored content for all 6 platforms simultaneously — in seconds.',
    icon: Zap,
    iconClass: 'bg-amber-500/20 text-amber-400',
    shadow: 'shadow-amber-500/20',
    delay: 160,
  },
  {
    number: '3',
    title: 'Copy and publish',
    description: 'Review each piece, copy with one click, and publish across all your channels. Done.',
    icon: BarChart3,
    iconClass: 'bg-emerald-500/20 text-emerald-400',
    shadow: 'shadow-emerald-500/20',
    delay: 320,
  },
];

const FREE_FEATURES = [
  '10 AI content generations',
  'All 6 platform formats',
  'Blog posts, tweets & captions',
  'Ad copy for Facebook & Google',
  'Full content history',
  'One-click copy to clipboard',
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/8 bg-slate-950/85 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-linear-to-br from-violet-500 to-violet-700 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/30 transition-all duration-300 group-hover:shadow-violet-500/50 group-hover:scale-105">
              <Sparkles className="w-4 h-4 text-white animate-sparkle" />
            </div>
            <span className="font-bold text-base">ContentAI</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-slate-400 hover:text-white transition-all duration-200 px-3 py-2 hidden sm:block rounded-lg hover:bg-white/6"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="text-sm bg-linear-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-violet-900/50 hover:shadow-violet-500/30 hover:-translate-y-0.5"
            >
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-4 sm:px-6 relative overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-16 left-[12%] w-[520px] h-[520px] bg-violet-600/18 rounded-full blur-[110px] animate-orb-1" />
          <div className="absolute top-32 right-[8%] w-[420px] h-[420px] bg-pink-600/14 rounded-full blur-[90px] animate-orb-2" />
          <div className="absolute bottom-8 left-[38%] w-[360px] h-[360px] bg-indigo-600/14 rounded-full blur-[80px] animate-orb-3" />
          <div className="absolute top-[55%] left-[3%] w-[260px] h-[260px] bg-blue-600/10 rounded-full blur-[60px] animate-orb-2" style={{ animationDelay: '5000ms' }} />
        </div>

        {/* Subtle grid */}
        <div className="absolute inset-0 bg-grid-dark pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative">
          {/* Badge */}
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/40 bg-violet-500/10 text-violet-300 text-sm font-medium mb-8 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 animate-sparkle" />
              Powered by Claude AI
            </div>
          </div>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.07] tracking-tight mb-6 animate-slide-up"
            style={{ animationDelay: '100ms' }}
          >
            Turn Any Idea Into{' '}
            <span
              className="text-transparent bg-clip-text animate-gradient-text"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #a78bfa 0%, #f472b6 40%, #818cf8 70%, #a78bfa 100%)',
              }}
            >
              Compelling Content
            </span>
            , Instantly
          </h1>

          {/* Subheading */}
          <p
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up"
            style={{ animationDelay: '200ms' }}
          >
            Generate a blog post, Twitter thread, Instagram caption, LinkedIn post,
            and ad copy for Facebook and Google — all from a single prompt.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
            style={{ animationDelay: '300ms' }}
          >
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 bg-linear-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white text-base font-semibold px-8 py-4 rounded-2xl transition-all duration-200 shadow-xl shadow-violet-900/50 hover:shadow-violet-500/30 hover:-translate-y-1 w-full sm:w-auto justify-center"
            >
              Start creating for free
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 border border-white/15 hover:border-white/30 text-white text-base font-medium px-8 py-4 rounded-2xl transition-all duration-200 hover:bg-white/5 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
            >
              Sign in
            </Link>
          </div>

          <p
            className="text-sm text-slate-600 mt-5 animate-slide-up"
            style={{ animationDelay: '400ms' }}
          >
            No credit card required · 10 free generations included
          </p>
        </div>

        {/* App preview */}
        <div
          className="max-w-3xl mx-auto mt-16 animate-slide-up"
          style={{ animationDelay: '500ms' }}
        >
          <div className="relative">
            {/* Glow behind preview */}
            <div className="absolute -inset-2 bg-linear-to-r from-violet-600/25 via-pink-600/15 to-indigo-600/25 rounded-3xl blur-2xl animate-glow-pulse" />

            <div className="relative rounded-2xl border border-white/10 bg-slate-900/95 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/60">
              {/* Window chrome */}
              <div className="bg-slate-800/80 px-4 py-3 flex items-center gap-2 border-b border-white/6">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                <div className="flex-1 mx-4">
                  <div className="h-5 bg-slate-700/60 rounded-md w-44 mx-auto" />
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-white/7 bg-slate-800/50 flex overflow-x-hidden">
                {['Blog Post', 'Twitter', 'Instagram', 'LinkedIn', 'Facebook Ad', 'Google Ad'].map(
                  (tab, i) => (
                    <div
                      key={tab}
                      className={`px-4 py-3 text-xs font-medium whitespace-nowrap border-b-2 shrink-0 ${
                        i === 0
                          ? 'border-violet-500 text-violet-400 bg-white/4'
                          : 'border-transparent text-slate-500'
                      }`}
                    >
                      {tab}
                    </div>
                  )
                )}
              </div>

              {/* Skeleton content */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2.5">
                    <div className="h-2 bg-violet-400/35 rounded-full w-20 animate-skeleton" />
                    <div className="h-5 bg-white/10 rounded-lg w-full animate-skeleton" style={{ animationDelay: '100ms' }} />
                    <div className="h-5 bg-white/8 rounded-lg w-4/5 animate-skeleton" style={{ animationDelay: '200ms' }} />
                  </div>
                  <div className="h-8 w-20 bg-white/8 rounded-lg shrink-0 animate-skeleton" style={{ animationDelay: '150ms' }} />
                </div>

                <div className="p-3 bg-white/4 rounded-xl border border-white/7 animate-skeleton" style={{ animationDelay: '300ms' }}>
                  <div className="h-2 bg-white/18 rounded-full w-28 mb-2" />
                  <div className="h-3 bg-white/7 rounded-full" />
                </div>

                <div className="space-y-2">
                  {[1, 0.9, 1, 0.7, 1, 0.85, 0.6].map((w, i) => (
                    <div
                      key={i}
                      className="h-3 bg-white/6 rounded-full animate-skeleton"
                      style={{ width: `${w * 100}%`, animationDelay: `${380 + i * 70}ms` }}
                    />
                  ))}
                </div>

                <div className="border-l-2 border-violet-500/50 pl-4 space-y-2 mt-1">
                  <div className="h-2 bg-white/18 rounded-full w-1/3 animate-skeleton" style={{ animationDelay: '600ms' }} />
                  {[1, 0.9, 0.75].map((w, i) => (
                    <div
                      key={i}
                      className="h-3 bg-white/6 rounded-full animate-skeleton"
                      style={{ width: `${w * 100}%`, animationDelay: `${680 + i * 70}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/45 pointer-events-none" />
        <div className="absolute inset-0 bg-grid-dark pointer-events-none opacity-60" />

        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-14 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-medium mb-4">
              6 Platforms
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">One Prompt, Six Platforms</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Stop rewriting the same message for every channel. Get platform-optimized
              content simultaneously.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PLATFORMS.map(({ icon: Icon, name, description, iconClass, hoverBorder, hoverShadow, delay }) => (
              <div
                key={name}
                className={`group rounded-2xl border border-white/8 bg-white/4 p-6 ${hoverBorder} ${hoverShadow} hover:bg-white/7 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-default animate-slide-up`}
                style={{ animationDelay: `${delay}ms` }}
              >
                <div className={`w-11 h-11 rounded-xl ${iconClass} flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{name}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
        {/* Central glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-violet-600/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-16 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-medium mb-4">
              Simple Process
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-slate-400 text-lg">From idea to publish-ready in under 30 seconds.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-7 left-[calc(16.67%+28px)] right-[calc(16.67%+28px)] h-px bg-linear-to-r from-violet-500/0 via-violet-500/40 to-violet-500/0" />

            {STEPS.map(({ number, title, description, icon: Icon, iconClass, shadow, delay }) => (
              <div
                key={number}
                className="text-center animate-slide-up"
                style={{ animationDelay: `${delay}ms` }}
              >
                <div className="relative inline-flex mb-6">
                  <div
                    className={`w-14 h-14 ${iconClass} border border-white/10 rounded-2xl flex items-center justify-center shadow-lg ${shadow} transition-all duration-300 hover:scale-110 hover:shadow-xl`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="absolute -top-2.5 -right-2.5 w-6 h-6 bg-slate-800 border border-white/15 rounded-full flex items-center justify-center text-xs font-black text-slate-300">
                    {number}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/45 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-lg mx-auto relative">
          <div className="relative animate-slide-up">
            {/* Animated border glow */}
            <div className="absolute -inset-px bg-linear-to-r from-violet-600/50 via-violet-400/20 to-pink-600/50 rounded-[1.35rem] blur-sm animate-glow-pulse" />

            <div className="relative rounded-2xl border border-violet-500/25 bg-linear-to-b from-violet-950/90 to-slate-900/95 p-10 backdrop-blur-sm overflow-hidden">
              {/* Inner shimmer */}
              <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-violet-500/40 to-transparent" />

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs font-medium mb-5">
                <Shield className="w-3.5 h-3.5" />
                Free to get started
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Start Generating Today</h2>
              <p className="text-slate-400 text-sm mb-7">
                Get 10 free content generations. No credit card required.
              </p>

              <ul className="text-left space-y-3 mb-8 inline-block">
                {FREE_FEATURES.map((f, i) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-sm text-slate-300 animate-slide-in-left"
                    style={{ animationDelay: `${i * 90}ms` }}
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="pt-1">
                <Link
                  href="/register"
                  className="group inline-flex items-center gap-2 bg-linear-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white text-sm font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-violet-900/50 hover:shadow-violet-500/30 hover:-translate-y-0.5 w-full justify-center"
                >
                  Create free account
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/6 py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-linear-to-br from-violet-500 to-violet-700 rounded-md flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-semibold text-slate-500">ContentAI</span>
          </div>
          <p className="text-xs text-slate-600">
            AI-powered content generation · Built with Next.js & Claude
          </p>
        </div>
      </footer>
    </div>
  );
}
