import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getCurrentUserId } from '@/lib/auth';
import { updateUser, getUserById } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing payment details' }, { status: 400 });
    }

    // Verify signature using HMAC-SHA256
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    // Check user isn't already pro
    const user = await getUserById(userId);
    if (user?.plan === 'pro') {
      return NextResponse.json({ success: true }); // already pro, no-op
    }

    // Upgrade user to pro
    await updateUser(userId, { plan: 'pro' });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[verify-payment]', error);
    return NextResponse.json({ error: 'Payment verification failed' }, { status: 500 });
  }
}
