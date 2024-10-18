'use client';

import { makeStore } from '@/lib/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import { Provider } from 'react-redux';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const storeRef = useRef(makeStore());

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={storeRef.current}>
        {children}
      </Provider>
    </QueryClientProvider>
    );
}
