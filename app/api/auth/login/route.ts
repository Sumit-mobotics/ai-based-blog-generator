import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validations';
import { getUserByEmail } from '@/lib/db';
import { verifyPassword, createToken, COOKIE_OPTIONS } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const token = await createToken(user.id);

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        plan: user.plan,
        generationsCount: user.generationsCount,
      },
    });

    response.cookies.set(COOKIE_OPTIONS.name, token, COOKIE_OPTIONS);
    return response;
  } catch (error) {
    console.error('[login]', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
