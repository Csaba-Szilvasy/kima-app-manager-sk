
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  type?: 'objednavka' | 'faktura' | 'zariadenie';
  className?: string;
}

const StatusBadge = ({ status, type = 'objednavka', className }: StatusBadgeProps) => {
  const getStatusStyle = () => {
    if (type === 'objednavka') {
      switch (status) {
        case 'Nová':
          return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'Naplánovaná':
          return 'bg-orange-100 text-orange-800 border-orange-200';
        case 'V procese':
          return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'Dokončená':
          return 'bg-green-100 text-green-800 border-green-200';
        case 'Fakturovaná':
          return 'bg-gray-100 text-gray-800 border-gray-200';
        default:
          return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    } else if (type === 'faktura') {
      switch (status) {
        case 'Koncept':
          return 'bg-gray-100 text-gray-800 border-gray-200';
        case 'Odoslaná':
          return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'Zaplatená':
          return 'bg-green-100 text-green-800 border-green-200';
        case 'Po splatnosti':
          return 'bg-red-100 text-red-800 border-red-200';
        default:
          return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    } else if (type === 'zariadenie') {
      switch (status) {
        case 'Funkčné':
          return 'bg-green-100 text-green-800 border-green-200';
        case 'Vyžaduje servis':
          return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'Nefunkčné':
          return 'bg-red-100 text-red-800 border-red-200';
        default:
          return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    }
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <Badge 
      className={cn(
        "font-medium text-xs border",
        getStatusStyle(),
        className
      )}
    >
      {status}
    </Badge>
  );
};

export default StatusBadge;
