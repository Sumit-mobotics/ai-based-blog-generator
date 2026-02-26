import { NextRequest, NextResponse } from 'next/server';
import { generateSchema } from '@/lib/validations';
import { generateContent } from '@/lib/claude';
import { saveGeneration, getUserById, updateUser } from '@/lib/db';
import { getCurrentUserId } from '@/lib/auth';

const FREE_TIER_LIMIT = 10;

export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const user = await getUserById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    if (user.plan === 'free' && user.generationsCount >= FREE_TIER_LIMIT) {
      return NextResponse.json(
        {
          error: `You've reached the free plan limit of ${FREE_TIER_LIMIT} generations. Upgrade to Pro for unlimited access.`,
          limitReached: true,
        },
        { status: 429 }
      );
    }

    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'your_groq_api_key_here') {
      return NextResponse.json(
        { error: 'API key not configured. Please add your GROQ_API_KEY to .env.local.' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const result = generateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { prompt, tone, audience } = result.data;

    const content = await generateContent(prompt, tone, audience);

    const generation = await saveGeneration({ userId, prompt, tone, audience, content });

    await updateUser(userId, { generationsCount: user.generationsCount + 1 });

    return NextResponse.json({ generation }, { status: 201 });
  } catch (error) {
    console.error('[generate]', error);
    const message = error instanceof Error ? error.message : 'Failed to generate content.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
