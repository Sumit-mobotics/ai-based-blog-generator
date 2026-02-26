import { NextResponse } from 'next/server';
import { getCurrentUserId } from '@/lib/auth';
import { getGenerationsByUserId } from '@/lib/db';

export async function GET() {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const generations = await getGenerationsByUserId(userId);
    return NextResponse.json({ generations });
  } catch (error) {
    console.error('[history GET]', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
