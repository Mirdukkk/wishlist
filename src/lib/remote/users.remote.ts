import { query } from '$app/server'
import { db } from '$lib/server/db'
import { users } from '$lib/server/db/schema'
import { z } from 'zod'
import { eq } from 'drizzle-orm'

export const createUser = query(z.string(), async (key) => {
	return db().insert(users).values({}).returning()
})

export const getUser = query(z.string(), async (id) => {
	return db().query.users.findFirst({
		where: eq(users.id, id),
		with: { reservations: true }
	})
})
