import { createContext } from 'svelte'
import type { Filter } from '$lib/components/common/Filters.svelte'
import type { Reservation } from '$lib/server/db/schema'

export interface WishlistContext {
	userId: string | null
	reservations: Reservation[]
	filterBy: Filter
	loading: boolean
	key?: string
	hasAccess: boolean
}

export const [getWishlistContext, setWishlistContext] = createContext<WishlistContext>()
