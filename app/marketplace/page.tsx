'use client';
import { Suspense } from 'react';
import MarketplaceClient from './MarketplaceClient';

export default function MarketplacePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MarketplaceClient />
    </Suspense>
  );
} 