'use client';

import { useState } from 'react';
import { Check, X, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

interface UpgradeModalProps {
  onClose: () => void;
  onSuccess: () => void;
  userName: string;
  userEmail: string;
}

const PRO_FEATURES = [
  'Unlimited AI content generations',
  'All 6 platform formats (blog, Twitter, Instagram & more)',
  'Priority AI processing',
  'Full generation history',
  'Lifetime access — pay once, use forever',
  'All future features included',
];

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: new (options: any) => { open: () => void };
  }
}

export default function UpgradeModal({ onClose, onSuccess, userName, userEmail }: UpgradeModalProps) {
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        toast.error('Could not load payment gateway. Check your internet connection.');
        setLoading(false);
        return;
      }

      const res = await fetch('/api/payment/create-order', { method: 'POST' });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Failed to initiate payment.');
        setLoading(false);
        return;
      }

      const rzp = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: 'ContentAI',
        description: 'Pro Plan — Lifetime Access',
        order_id: data.orderId,
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          const verify = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          });
          const verifyData = await verify.json();

          if (verify.ok && verifyData.success) {
            toast.success('Payment successful! Welcome to Pro 🎉');
            onSuccess();
          } else {
            toast.error(verifyData.error || 'Payment verification failed. Contact support.');
          }
          setLoading(false);
        },
        prefill: { name: userName, email: userEmail },
        theme: { color: '#7c3aed' },
        modal: {
          ondismiss: () => setLoading(false),
        },
      });

      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/60">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-violet-600 rounded-lg flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-base font-semibold text-white">Upgrade to Pro</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/8"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Price */}
        <div className="px-6 pt-6 pb-4 text-center">
          <p className="text-5xl font-bold text-white">₹499</p>
          <p className="text-slate-400 text-sm mt-1">One-time payment · Lifetime access</p>
        </div>

        {/* Features */}
        <ul className="px-6 pb-5 space-y-2.5">
          {PRO_FEATURES.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
              <Check className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="px-6 pb-6">
          <Button
            onClick={handlePayment}
            loading={loading}
            size="lg"
            className="w-full"
          >
            <Zap className="h-4 w-4" />
            Pay ₹499 — Upgrade Now
          </Button>
          <div className="flex items-center justify-center gap-1.5 mt-3">
            <Shield className="h-3 w-3 text-slate-500" />
            <p className="text-center text-xs text-slate-500">
              Secured by Razorpay · UPI, Cards & Net Banking accepted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
