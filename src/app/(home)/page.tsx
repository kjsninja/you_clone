
import { Suspense } from 'react';
import { ClientHome } from './client';

import { HydrateClient, trpc } from '@/app/trpc/server';
import { ErrorBoundary } from 'react-error-boundary';

export default async function Home() {
  void await trpc.hello.prefetch({ text: 'Kenster5' })

  return (
    <HydrateClient>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <ClientHome />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  );
}
