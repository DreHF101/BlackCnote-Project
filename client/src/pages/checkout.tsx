import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CreditCard, Shield, Clock } from 'lucide-react';
import { Link, useLocation } from 'wouter';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_placeholder');

interface CheckoutFormProps {
  amount: number;
  currency: string;
  type: string;
  onSuccess: (result: any) => void;
  onCancel: () => void;
}

const CheckoutForm = ({ amount, currency, type, onSuccess, onCancel }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + '/checkout/success',
        },
        redirect: 'if_required',
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        toast({
          title: "Payment Successful",
          description: "Your payment has been processed successfully!",
        });
        onSuccess(paymentIntent);
      }
    } catch (error: any) {
      toast({
        title: "Payment Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl text-center">Complete Payment</CardTitle>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            ${amount.toFixed(2)} {currency.toUpperCase()}
          </div>
          <Badge variant="secondary">{type.charAt(0).toUpperCase() + type.slice(1)}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <PaymentElement />
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Shield className="h-4 w-4" />
            <span>Your payment information is secure and encrypted</span>
          </div>

          <div className="flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={isProcessing}
              className="flex-1"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!stripe || isProcessing}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 animate-spin" />
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Pay Now
                </div>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default function Checkout() {
  const [location, navigate] = useLocation();
  const [clientSecret, setClientSecret] = useState("");
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    // Get payment details from URL params or state
    const urlParams = new URLSearchParams(window.location.search);
    const amount = parseFloat(urlParams.get('amount') || '0');
    const type = urlParams.get('type') || 'deposit';
    const currency = urlParams.get('currency') || 'USD';
    const investmentId = urlParams.get('investmentId');

    if (amount <= 0) {
      navigate('/dashboard');
      return;
    }

    setPaymentData({ amount, type, currency, investmentId });

    // Create PaymentIntent
    const createPayment = async () => {
      try {
        const response = await apiRequest("POST", "/api/create-payment", {
          gatewaySlug: 'stripe',
          amount,
          currency,
          type,
          investmentId: investmentId ? parseInt(investmentId) : undefined,
        });

        const data = await response.json();
        if (data.paymentIntent?.clientSecret) {
          setClientSecret(data.paymentIntent.clientSecret);
        } else {
          throw new Error('No client secret received');
        }
      } catch (error: any) {
        console.error('Payment creation failed:', error);
        navigate('/dashboard?error=payment_failed');
      }
    };

    createPayment();
  }, [navigate]);

  const handleSuccess = (result: any) => {
    navigate(`/checkout/success?payment_intent=${result.id}`);
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  if (!clientSecret || !paymentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-600">Preparing payment...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Elements 
          stripe={stripePromise} 
          options={{ 
            clientSecret,
            appearance: {
              theme: 'night',
              variables: {
                colorPrimary: '#2563eb',
                colorBackground: '#1e293b',
                colorText: '#f1f5f9',
                colorDanger: '#ef4444',
                borderRadius: '8px',
              }
            }
          }}
        >
          <CheckoutForm 
            amount={paymentData.amount}
            currency={paymentData.currency}
            type={paymentData.type}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </Elements>
      </div>
    </div>
  );
}