import { db } from '@/database';
import { eq } from 'drizzle-orm';
import { usersTable } from '@/database/schema';
import { auth } from '@clerk/nextjs/server';
import { initTRPC, TRPCError } from '@trpc/server';
import { cache } from 'react';
import superjson from 'superjson';
import { ratelimit } from '@/lib/ratelimit';

export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  const { userId } = await auth();

  return { clerkUserId: userId };
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async function isAuthed(opts){
  const { ctx } = opts;

  // if user is not logged in
  if (!ctx.clerkUserId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });  
  }

  // get user info in db
  const [user] = await db.select().from(usersTable).where(eq(usersTable.clerkId, ctx.clerkUserId)).limit(1);

  if(!user){
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }


  // check user ratelimit
  const { success } = await ratelimit.limit(user.id);

  if(!success){
    throw new TRPCError({ code: 'TOO_MANY_REQUESTS' });
  }

  return opts.next({
    ctx: {
      ...ctx,
      user,
    },
  });
});