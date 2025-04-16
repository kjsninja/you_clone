"use client";

import { trpc } from '@/app/trpc/client';

export const ClientHome = () => {

  const [data] = trpc.hello.useSuspenseQuery({ text: 'Kenster52' })

  return (
    <div>
      Client component says: { data.greeting }
    </div>
  );
}