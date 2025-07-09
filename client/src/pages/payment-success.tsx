import { useEffect, useState } from 'react';
import { useLocation, Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Download, Eye } from 'lucide-react';

interface PaymentDetails {
  id: string;
  amount: string;
  currency: string;
  status: string;
  created: number;
}

export default function PaymentSuccess() {
  const [location] = useLocation();
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentIntentId = urlParams.get('payment_intent');
    const paymentIntentClientSecret = urlParams.get('payment_intent_client_secret');

    if (!paymentIntentId) {
      // Redirect to dashboard if no payment intent
      window.location.href = '/dashboard';
      return;
    }

    // In a real implementation, you would fetch payment details from your backend
    // For now, we'll simulate the data
    setTimeout(() => {
      setPaymentDetails({
        id: paymentIntentId,
        amount: urlParams.get('amount') || '100.00',
        currency: urlParams.get('currency') || 'USD',
        status: 'succeeded',
        created: Date.now(),
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-600">Confirming payment...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!paymentDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <p className="text-red-600 mb-4">Payment not found</p>
            <Link href="/dashboard">
              <Button>Return to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
          <p className="text-gray-600">Your payment has been processed successfully</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Payment Details */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Amount</span>
              <span className="font-semibold text-xl">
                ${parseFloat(paymentDetails.amount).toFixed(2)} {paymentDetails.currency.toUpperCase()}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Status</span>
              <Badge variant="default" className="bg-green-100 text-green-800">
                {paymentDetails.status.charAt(0).toUpperCase() + paymentDetails.status.slice(1)}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Transaction ID</span>
              <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                {paymentDetails.id.slice(-8)}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Date</span>
              <span className="text-sm">
                {new Date(paymentDetails.created).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            
            <Link href="/transactions" className="block">
              <Button className="w-full" variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                View Transaction History
              </Button>
            </Link>
            
            <Link href="/dashboard" className="block">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <ArrowRight className="w-4 h-4 mr-2" />
                Return to Dashboard
              </Button>
            </Link>
          </div>

          {/* Next Steps */}
          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-800 mb-2">What's Next?</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Your account balance has been updated</li>
              <li>• You can now make new investments</li>
              <li>• Check your portfolio for updated metrics</li>
              <li>• Receipt has been sent to your email</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}