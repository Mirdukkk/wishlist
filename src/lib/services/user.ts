import type { WishlistContext } from '$lib/context/wishlist'
import { createUser, validateUser } from '$lib/remote/users.remote'

export function createUserService(ctx: WishlistContext) {
	return {
		createUser: async () => {
			try {
				const user = await createUser(ctx.key)
				const id = user[0].id

				ctx.userId = id
				ctx.hasAccess = true
				localStorage.setItem('user', id)
			} catch (e) {
				ctx.hasAccess = false
				throw e
			}
		},

		validateUser: async () => {
			try {
				return await validateUser(ctx.key)
			} catch {
				return false
			}
		}
	}
}
