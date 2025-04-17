import { createTRPCRouter, protectedProcedure } from '@/trpc/init';
import { categoriesRouter } from '@/modules/categories/server/procedures';
import { studioRouter } from '@/modules/studio/server/procedures';
import { videosRouter } from '@/modules/videos/server/procedures';
export const appRouter = createTRPCRouter({
  videos: videosRouter,
  categories: categoriesRouter,
  studio: studioRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;