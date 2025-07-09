import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { PaymentService, PaymentTransaction, getPaymentStatusColor, getPaymentTypeIcon, formatCurrency } from '@/lib/payment';
import { RefreshCcw, Download, Eye } from 'lucide-react';

interface PaymentHistoryProps {
  limit?: number;
  showHeader?: boolean;
  className?: string;
}

export default function PaymentHistory({ 
  limit = 10, 
  showHeader = true, 
  className = '' 
}: PaymentHistoryProps) {
  const { data: transactions, isLoading, refetch } = useQuery<PaymentTransaction[]>({
    queryKey: ['/api/payment-transactions'],
    queryFn: () => PaymentService.getUserTransactions(),
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const formatTransactionAmount = (transaction: PaymentTransaction) => {
    const amount = parseFloat(transaction.amount);
    const isNegative = ['withdrawal', 'refund'].includes(transaction.type);
    return `${isNegative ? '-' : '+'}${formatCurrency(Math.abs(amount), transaction.currency)}`;
  };

  const getTransactionDescription = (transaction: PaymentTransaction) => {
    if (transaction.description) {
      return transaction.description;
    }
    
    const typeDescriptions: Record<string, string> = {
      deposit: 'Account Deposit',
      withdrawal: 'Account Withdrawal',
      investment: 'Investment Purchase',
      refund: 'Payment Refund',
      fee: 'Processing Fee',
    };
    
    return typeDescriptions[transaction.type] || 'Transaction';
  };

  if (isLoading) {
    return (
      <Card className={className}>
        {showHeader && (
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
        )}
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const displayTransactions = transactions?.slice(0, limit) || [];

  return (
    <Card className={className}>
      {showHeader && (
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>Payment History</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="flex items-center gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Refresh
          </Button>
        </CardHeader>
      )}
      
      <CardContent>
        {displayTransactions.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              💳
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions yet</h3>
            <p className="text-gray-600 mb-4">Your payment history will appear here once you make your first transaction.</p>
            <Button variant="outline">
              Make a Deposit
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {displayTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg">
                    {getPaymentTypeIcon(transaction.type)}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900">
                        {getTransactionDescription(transaction)}
                      </h4>
                      <Badge 
                        variant="secondary" 
                        className={`${getPaymentStatusColor(transaction.status)} text-xs`}
                      >
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>
                        {formatDistanceToNow(new Date(transaction.createdAt), { addSuffix: true })}
                      </span>
                      {transaction.externalTransactionId && (
                        <>
                          <span>•</span>
                          <span className="font-mono text-xs">
                            {transaction.externalTransactionId.slice(-8)}
                          </span>
                        </>
                      )}
                    </div>
                    
                    {parseFloat(transaction.processingFee) > 0 && (
                      <div className="text-xs text-gray-500">
                        Processing fee: {formatCurrency(parseFloat(transaction.processingFee), transaction.currency)}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <div className={`font-semibold ${
                    ['withdrawal', 'refund'].includes(transaction.type) 
                      ? 'text-red-600' 
                      : 'text-green-600'
                  }`}>
                    {formatTransactionAmount(transaction)}
                  </div>
                  
                  <div className="flex items-center gap-1 mt-1">
                    <Button variant="ghost" size="sm" className="h-6 px-2">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 px-2">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {transactions && transactions.length > limit && (
              <div className="text-center pt-4 border-t">
                <Button variant="outline">
                  View All Transactions ({transactions.length})
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}