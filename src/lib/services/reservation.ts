import { type WishlistContext } from '$lib/context/wishlist'
import { createReservation, removeReservation } from '$lib/remote/reservations.remote'
import { createUserService } from '$lib/services/user'

export function createReservationService(ctx: WishlistContext) {
	return {
		userReservations: () =>
			ctx.reservations.filter((r) => r.userId === ctx.userId).map((r) => r.itemId),

		toggle: async (itemId: string, maxReservations?: number) => {
			if (ctx.loading) return
			ctx.loading = true

			try {
				const { createUser } = createUserService(ctx)

				if (!ctx.userId) await createUser()
				const userId = ctx.userId
				if (!userId) return

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

					console.log(`Removing reservation for product ${itemId} and user ${userId}`)
					return
				} else {
					const reservation = await createReservation({ userId, itemId })
					ctx.reservations = [...ctx.reservations, reservation]

					console.log(
						`Creating reservation for product ${reservation.itemId} and user ${reservation.userId}`
					)
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
