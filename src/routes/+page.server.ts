import { db } from '$lib/server/db'
import type { PageServerLoad } from './$types'
import { reservations as dbReservations } from '$lib/server/db/schema'

export const load: PageServerLoad = async ({ params }) => {
	const reservations = await db().select().from(dbReservations)
	return { reservations }
}
