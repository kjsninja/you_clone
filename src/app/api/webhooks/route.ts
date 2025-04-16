import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { db } from '@/database'
import { usersTable } from '@/database/schema'
import { eq } from 'drizzle-orm'

export async function POST(req: Request) {
  try {
    const evt = await verifyWebhook(req)

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data
    const eventType = evt.type

    if(id === undefined){
      return new Response('Error verifying webhook with undefined id', { status: 400 })
    }

    if(eventType === 'user.created'){
      await db.insert(usersTable).values({
        clerkId: id,
        name: `${evt.data.first_name} ${evt.data.last_name}`,
        imageUrl: evt.data.image_url
      })
    }

    if(eventType === 'user.deleted'){
      await db.delete(usersTable).where(eq(usersTable.clerkId, id));
    }

    if(eventType === 'user.updated'){
      await db.update(usersTable).set({
        name: `${evt.data.first_name} ${evt.data.last_name}`,
        imageUrl: evt.data.image_url        
      }).where(eq(usersTable.clerkId, id));
    }

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}