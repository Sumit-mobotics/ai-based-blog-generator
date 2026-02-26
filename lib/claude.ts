import Groq from 'groq-sdk';
import { GeneratedContent } from '@/types';

const SYSTEM_PROMPT = `You are an expert content creator, copywriter, and digital marketing strategist with 15+ years of experience across all major platforms. You produce content that is compelling, platform-optimized, and drives real engagement and conversions. You deeply understand each platform's unique audience, tone, and best practices.`;

function buildUserPrompt(prompt: string, tone: string, audience: string): string {
  return `Create comprehensive, high-quality content for multiple digital platforms.

Topic/Prompt: ${prompt}
Tone: ${tone}
Target Audience: ${audience}

Return ONLY a valid JSON object with this exact structure — no markdown fencing, no explanation, no preamble:

{
  "blogPost": {
    "title": "Compelling, SEO-optimized title (H1)",
    "metaDescription": "155-character meta description that includes primary keywords",
    "intro": "3-paragraph engaging introduction that hooks the reader and sets context",
    "sections": [
      {"heading": "Section Heading", "content": "2-3 rich paragraphs of valuable content"},
      {"heading": "Section Heading", "content": "2-3 rich paragraphs of valuable content"},
      {"heading": "Section Heading", "content": "2-3 rich paragraphs of valuable content"}
    ],
    "conclusion": "Strong 2-paragraph conclusion with a clear call-to-action",
    "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
  },
  "twitterThread": {
    "tweets": [
      "Tweet 1: Powerful hook (max 270 chars) — make people stop scrolling",
      "Tweet 2: Key insight or story point (max 270 chars)",
      "Tweet 3: Data point or example (max 270 chars)",
      "Tweet 4: Actionable tip (max 270 chars)",
      "Tweet 5: Deeper insight (max 270 chars)",
      "Tweet 6: Call-to-action and thread summary (max 270 chars)"
    ]
  },
  "instagramCaption": {
    "caption": "Engaging multi-paragraph caption with strategic emoji use, storytelling hook, value delivery, and clear CTA",
    "hashtags": ["hashtag1", "hashtag2", "hashtag3", "hashtag4", "hashtag5", "hashtag6", "hashtag7", "hashtag8", "hashtag9", "hashtag10", "hashtag11", "hashtag12"]
  },
  "linkedinPost": {
    "content": "Professional 4-paragraph post with a compelling opening line, value-packed body, personal insight or data, and engagement question"
  },
  "facebookAd": {
    "headline": "Attention-grabbing headline (max 40 chars)",
    "primaryText": "2-3 sentence compelling ad copy with emotional appeal, benefit statement, and social proof",
    "cta": "Call-to-action button text (e.g., Learn More, Shop Now, Get Started)"
  },
  "googleAd": {
    "headlines": [
      "Headline 1 (max 30 chars)",
      "Headline 2 (max 30 chars)",
      "Headline 3 (max 30 chars)"
    ],
    "descriptions": [
      "Description 1 highlighting key benefit (max 90 chars)",
      "Description 2 with call-to-action (max 90 chars)"
    ]
  }
}`;
}

export async function generateContent(
  prompt: string,
  tone: string,
  audience: string
): Promise<GeneratedContent> {
  if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'your_groq_api_key_here') {
    throw new Error('GROQ_API_KEY is not configured. Add it to your .env.local file.');
  }

  const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const completion = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: buildUserPrompt(prompt, tone, audience) },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.8,
    max_tokens: 4096,
  });

  const raw = completion.choices[0]?.message?.content?.trim();
  if (!raw) {
    throw new Error('No response received from AI. Please try again.');
  }

  try {
    return JSON.parse(raw) as GeneratedContent;
  } catch {
    throw new Error('AI returned invalid JSON. Please try again.');
  }
}
