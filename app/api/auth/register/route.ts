import { NextRequest, NextResponse } from 'next/server';
import { registerSchema } from '@/lib/validations';
import { getUserByEmail, createUser } from '@/lib/db';
import { hashPassword, createToken, COOKIE_OPTIONS } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, password, name } = result.data;

    const existing = await getUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const user = await createUser({ email, name, passwordHash });
    const token = await createToken(user.id);

    const response = NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          plan: user.plan,
          generationsCount: user.generationsCount,
        },
      },
      { status: 201 }
    );

    response.cookies.set(COOKIE_OPTIONS.name, token, COOKIE_OPTIONS);
    return response;
  } catch (error) {
    console.error('[register]', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
