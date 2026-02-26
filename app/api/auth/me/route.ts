import { NextResponse } from 'next/server';
import { getCurrentUserId } from '@/lib/auth';
import { getUserById } from '@/lib/db';

export async function GET() {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const user = await getUserById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        plan: user.plan,
        generationsCount: user.generationsCount,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('[me]', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
