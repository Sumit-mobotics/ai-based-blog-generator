import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { getCurrentUserId } from '@/lib/auth';

const PRO_AMOUNT_PAISE = 49900; // ₹499 in paise (1 INR = 100 paise)

export async function POST() {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: 'Payment gateway not configured' }, { status: 503 });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: PRO_AMOUNT_PAISE,
      currency: 'INR',
      receipt: `receipt_${userId}_${Date.now()}`,
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('[create-order]', error);
    return NextResponse.json({ error: 'Failed to create payment order' }, { status: 500 });
  }
}
