'use client';

import InventoryProvider from '@/components/InventoryProvider';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return <InventoryProvider>{children}</InventoryProvider>;
}
