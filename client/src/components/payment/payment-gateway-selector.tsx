import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Smartphone, Bitcoin, Building2, Loader2 } from 'lucide-react';

interface PaymentGateway {
  id: number;
  name: string;
  slug: string;
  displayName: string;
  description: string;
  icon: string;
  isActive: boolean;
  supportedCurrencies: string[];
  minAmount: string;
  maxAmount: string;
  processingFee: string;
  processingFeeType: string;
}

interface PaymentGatewaySelectorProps {
  amount: number;
  currency: string;
  onGatewaySelect: (gateway: PaymentGateway) => void;
  selectedGateway?: PaymentGateway;
}

const gatewayIcons: Record<string, React.ComponentType<any>> = {
  'fas fa-credit-card': CreditCard,
  'fab fa-paypal': CreditCard,
  'fab fa-bitcoin': Bitcoin,
  'fas fa-university': Building2,
  'fas fa-mobile-alt': Smartphone,
};

export default function PaymentGatewaySelector({
  amount,
  currency,
  onGatewaySelect,
  selectedGateway,
}: PaymentGatewaySelectorProps) {
  const { data: gateways, isLoading } = useQuery<PaymentGateway[]>({
    queryKey: ['/api/payment-gateways'],
  });

  const getGatewayIcon = (iconClass: string) => {
    const IconComponent = gatewayIcons[iconClass] || CreditCard;
    return IconComponent;
  };

  const calculateProcessingFee = (gateway: PaymentGateway): number => {
    const feeRate = parseFloat(gateway.processingFee);
    if (gateway.processingFeeType === 'fixed') {
      return feeRate;
    } else {
      return (amount * feeRate) / 100;
    }
  };

  const isGatewayAvailable = (gateway: PaymentGateway): boolean => {
    const minAmount = parseFloat(gateway.minAmount);
    const maxAmount = parseFloat(gateway.maxAmount);
    const isCurrencySupported = gateway.supportedCurrencies.includes(currency.toLowerCase());
    
    return (
      gateway.isActive &&
      amount >= minAmount &&
      amount <= maxAmount &&
      isCurrencySupported
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Select Payment Method</h3>
        <div className="grid gap-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-200 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!gateways || gateways.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No payment methods available</p>
      </div>
    );
  }

  const availableGateways = gateways.filter(isGatewayAvailable);
  const unavailableGateways = gateways.filter(g => !isGatewayAvailable(g));

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Select Payment Method</h3>
      
      {/* Available Gateways */}
      <div className="grid gap-3">
        {availableGateways.map((gateway) => {
          const IconComponent = getGatewayIcon(gateway.icon);
          const processingFee = calculateProcessingFee(gateway);
          const isSelected = selectedGateway?.id === gateway.id;

          return (
            <Card 
              key={gateway.id} 
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => onGatewaySelect(gateway)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-[var(--text-primary)]">{gateway.displayName}</h4>
                      <p className="text-sm text-[var(--text-secondary)]">{gateway.description}</p>
                      
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">
                          Fee: {gateway.processingFeeType === 'fixed' 
                            ? `$${processingFee.toFixed(2)}` 
                            : `${gateway.processingFee}%`}
                        </span>
                        {processingFee > 0 && (
                          <Badge variant="outline" className="text-xs">
                            +${processingFee.toFixed(2)}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">
                      ${(amount + processingFee).toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500">Total</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Unavailable Gateways */}
      {unavailableGateways.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-600">Unavailable for this amount</h4>
          <div className="grid gap-2">
            {unavailableGateways.map((gateway) => {
              const IconComponent = getGatewayIcon(gateway.icon);
              const minAmount = parseFloat(gateway.minAmount);
              const maxAmount = parseFloat(gateway.maxAmount);
              
              let reason = '';
              if (amount < minAmount) {
                reason = `Minimum: $${minAmount.toFixed(2)}`;
              } else if (amount > maxAmount) {
                reason = `Maximum: $${maxAmount.toFixed(2)}`;
              } else if (!gateway.supportedCurrencies.includes(currency.toLowerCase())) {
                reason = `${currency} not supported`;
              } else if (!gateway.isActive) {
                reason = 'Currently unavailable';
              }

              return (
                <Card key={gateway.id} className="opacity-50">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                          <IconComponent className="w-4 h-4 text-gray-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-600">{gateway.displayName}</h4>
                          <p className="text-xs text-gray-500">{reason}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <div className="w-5 h-5 text-blue-600 mt-0.5">
            🔒
          </div>
          <div className="text-sm text-blue-800">
            <p className="font-medium">Secure Payment Processing</p>
            <p className="text-blue-700">
              All payments are processed through industry-standard encryption and security protocols.
              Your payment information is never stored on our servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}