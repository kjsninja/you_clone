import { z } from 'zod'
import { eq, and, or, lt, desc } from 'drizzle-orm'
import { db } from "@/database";
import { videosTable } from "@/database/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const studioRouter = createTRPCRouter({
  getMany: protectedProcedure
  .input(
    z.object({
      cursor: z.object({
        id: z.string().uuid(),
        updatedAt: z.date()
      })
      .nullish(),
      limit: z.number().min(1).max(100)
    })
  )
  .query(async ({ ctx, input }) => {
    const { cursor, limit } = input;
    const { id: userId } = ctx.user;

    const data = await db.select().from(videosTable).where(
      and(
        eq(videosTable.userId, userId),
        cursor ? or(
          lt(videosTable.updatedAt, cursor.updatedAt),
          and(
            eq(videosTable.updatedAt, cursor.updatedAt),
            lt(videosTable.id, cursor.id)
          )
        ) : undefined
      )
    ).orderBy(desc(videosTable.updatedAt), desc(videosTable.id))
    // add 1 to the limit to check if there is more data
    .limit(limit + 1);

    const hasMore = data.length > limit;
    // remove the last item if there is more data
    const items = hasMore ? data.slice(0, -1) : data;

    // set the next cursor to the last item if there is more data
    const lastItem = items[items.length - 1];
    const nextCursor =  hasMore ? {
      id: lastItem.id,
      updatedAt: lastItem.updatedAt
    } : null;

    return {
      items,
      nextCursor
    };
  })
})