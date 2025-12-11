import { type WishlistContext } from '$lib/context/wishlist'
import {
	createReservation,
	getReservations,
	removeReservation
} from '$lib/remote/reservations.remote'

export function createReservationService(ctx: WishlistContext) {
	return {
		userReservations: () =>
			ctx.reservations.filter((r) => r.userId === ctx.userId).map((r) => r.itemId),

		toggle: async (itemId: string, maxReservations?: number) => {
			if (ctx.loading || !ctx.hasAccess) return
			ctx.loading = true

			try {
				const userId = ctx.userId
				if (!userId) return

				ctx.reservations = await getReservations()

				const hasUserReservation = ctx.reservations.some(
					(r) => r.itemId === itemId && r.userId === userId
				)

				const count = ctx.reservations.filter((r) => r.itemId === itemId).length

				if (!hasUserReservation) {
					if (maxReservations !== undefined && count >= maxReservations) return
					if (maxReservations === undefined && count > 0) return
				}

				if (hasUserReservation) {
					await removeReservation({ userId, itemId })
					ctx.reservations = ctx.reservations.filter(
						(r) => r.itemId !== itemId || r.userId !== userId
					)

					return
				} else {
					const reservation = await createReservation({ userId, itemId })
					ctx.reservations = [...ctx.reservations, reservation]
				}
			} catch (e) {
				console.error('Error toggling reservation:', e)
			} finally {
				ctx.loading = false
			}
		},

		canReserve: (itemId: string, maxReservations?: number) => {
			const { userId } = ctx

			const userReserved = ctx.reservations.some((r) => r.itemId === itemId && r.userId === userId)
			const count = ctx.reservations.filter((r) => r.itemId === itemId).length

			if (userReserved) return true

			if (maxReservations !== undefined && count >= maxReservations) {
				return false
			}

			return !(maxReservations === undefined && count > 0)
		}
	}
}
