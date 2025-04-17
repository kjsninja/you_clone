import { db } from '@/database'
import { categoriesTable } from '@/database/schema'
import { baseProcedure, createTRPCRouter } from '@/trpc/init'
import { TRPCError } from '@trpc/server';

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ()=>{
    const data = await db.select().from(categoriesTable);
    return data
  })
})