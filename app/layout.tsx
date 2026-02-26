import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'ContentAI — AI Content Creator',
    template: '%s | ContentAI',
  },
  description:
    'Generate blog posts, social media captions, and ad copy from a single prompt. Powered by Claude AI.',
  keywords: ['AI content', 'content generator', 'blog post generator', 'social media', 'ad copy'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              borderRadius: '12px',
              fontFamily: 'var(--font-geist-sans)',
              fontSize: '14px',
            },
          }}
        />
      </body>
    </html>
  );
}
