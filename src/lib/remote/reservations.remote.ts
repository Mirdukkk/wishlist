import { query } from '$app/server'
import { db } from '$lib/server/db'
import { reservations } from '$lib/server/db/schema'
import { z } from 'zod'
import { and, eq } from 'drizzle-orm'

export const getReservations = query(async () => {
	return db().select().from(reservations)
})

export const createReservation = query(
	z.object({ userId: z.string(), itemId: z.string() }),
	async ({ userId, itemId }) => {
		const [reservation] = await db().insert(reservations).values({ userId, itemId }).returning()
		return reservation
	}
)

export const removeReservation = query(
	z.object({ userId: z.string(), itemId: z.string() }),
	async ({ userId, itemId }) => {
		await db()
			.delete(reservations)
			.where(and(eq(reservations.userId, userId), eq(reservations.itemId, itemId)))
	}
)
