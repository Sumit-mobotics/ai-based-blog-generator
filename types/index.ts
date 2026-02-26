export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string;
  plan: 'free' | 'pro';
  generationsCount: number;
}

export interface PublicUser {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'pro';
  generationsCount: number;
  createdAt: string;
}

export interface ContentGeneration {
  id: string;
  userId: string;
  prompt: string;
  tone: string;
  audience: string;
  content: GeneratedContent;
  createdAt: string;
}

export interface GenerationSummary {
  id: string;
  prompt: string;
  tone: string;
  audience: string;
  blogTitle: string;
  createdAt: string;
}

export interface GeneratedContent {
  blogPost: BlogPost;
  twitterThread: TwitterThread;
  instagramCaption: InstagramCaption;
  linkedinPost: LinkedInPost;
  facebookAd: FacebookAd;
  googleAd: GoogleAd;
}

export interface BlogPost {
  title: string;
  metaDescription: string;
  intro: string;
  sections: { heading: string; content: string }[];
  conclusion: string;
  tags: string[];
}

export interface TwitterThread {
  tweets: string[];
}

export interface InstagramCaption {
  caption: string;
  hashtags: string[];
}

export interface LinkedInPost {
  content: string;
}

export interface FacebookAd {
  headline: string;
  primaryText: string;
  cta: string;
}

export interface GoogleAd {
  headlines: string[];
  descriptions: string[];
}

export type ContentTab = 'blog' | 'twitter' | 'instagram' | 'linkedin' | 'facebook' | 'google';

export type Tone = 'professional' | 'casual' | 'humorous' | 'inspirational' | 'educational' | 'persuasive';
