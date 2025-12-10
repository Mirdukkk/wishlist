import type { WishlistContext } from '$lib/context/wishlist'
import { createUser } from '$lib/remote/users.remote'

export function createUserService(ctx: WishlistContext) {
	return {
		createUser: async () => {
			const user = await createUser('key')
			const id = user[0].id

			ctx.userId = id
			localStorage.setItem('user', id)
		}
	}
}
