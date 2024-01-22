import React from 'react';

export const queryClient = new QueryClient();

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
