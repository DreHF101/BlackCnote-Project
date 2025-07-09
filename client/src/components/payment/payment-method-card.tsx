import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Trash2, Edit } from 'lucide-react';

interface PaymentMethod {
  id: number;
  type: string;
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  holderName?: string;
  isDefault: boolean;
  isActive: boolean;
}

interface PaymentMethodCardProps {
  paymentMethod: PaymentMethod;
  onEdit?: (method: PaymentMethod) => void;
  onDelete?: (method: PaymentMethod) => void;
  onSetDefault?: (method: PaymentMethod) => void;
}

const getBrandIcon = (brand: string) => {
  const brandIcons: Record<string, string> = {
    visa: '💳',
    mastercard: '💳',
    amex: '💳',
    discover: '💳',
    paypal: '🅿️',
    bitcoin: '₿',
    ethereum: 'Ξ',
    litecoin: 'Ł',
  };
  
  return brandIcons[brand?.toLowerCase()] || '💳';
};

const formatCardType = (type: string) => {
  const typeMap: Record<string, string> = {
    card: 'Credit/Debit Card',
    bank_account: 'Bank Account',
    crypto_wallet: 'Crypto Wallet',
    digital_wallet: 'Digital Wallet',
  };
  
  return typeMap[type] || type;
};

export default function PaymentMethodCard({
  paymentMethod,
  onEdit,
  onDelete,
  onSetDefault,
}: PaymentMethodCardProps) {
  const { type, last4, brand, expiryMonth, expiryYear, holderName, isDefault, isActive } = paymentMethod;

  const formatExpiry = () => {
    if (expiryMonth && expiryYear) {
      return `${String(expiryMonth).padStart(2, '0')}/${String(expiryYear).slice(-2)}`;
    }
    return null;
  };

  return (
    <Card className={`${!isActive ? 'opacity-50' : ''} ${isDefault ? 'ring-2 ring-blue-500' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
              {getBrandIcon(brand || '')}
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-gray-900">
                  {formatCardType(type)}
                </h4>
                {isDefault && (
                  <Badge variant="default" className="text-xs">
                    Default
                  </Badge>
                )}
              </div>
              
              <div className="text-sm text-gray-600">
                {type === 'card' && last4 && (
                  <span>•••• •••• •••• {last4}</span>
                )}
                {type === 'crypto_wallet' && (
                  <span>{brand?.toUpperCase()} Wallet</span>
                )}
                {type === 'digital_wallet' && brand && (
                  <span>{brand.charAt(0).toUpperCase() + brand.slice(1)}</span>
                )}
              </div>
              
              {holderName && (
                <div className="text-xs text-gray-500 mt-1">
                  {holderName}
                </div>
              )}
              
              {formatExpiry() && (
                <div className="text-xs text-gray-500">
                  Expires {formatExpiry()}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {!isDefault && onSetDefault && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSetDefault(paymentMethod)}
                className="text-xs"
              >
                Set Default
              </Button>
            )}
            
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(paymentMethod)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(paymentMethod)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}