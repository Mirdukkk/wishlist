<script lang="ts">
	import { onMount } from 'svelte'
	import { page } from '$app/state'
	import { goto } from '$app/navigation'

	import { type WishlistContext, setWishlistContext } from '$lib/context/wishlist'
	import { createUserService } from '$lib/services/user'

	import Main from '$lib/components/layout/Main.svelte'
	import Hero from '$lib/components/sections/Hero.svelte'
	import Products from '$lib/components/sections/Products.svelte'
	import GiftCards from '$lib/components/sections/GiftCards.svelte'

	let wishlist: WishlistContext = $state({
		userId: null,
		reservations: page.data.reservations,
		filterBy: 'all',
		loading: false,
		hasAccess: false
	})

	const ctx = wishlist
	const userService = createUserService(ctx)
	const { createUser, validateUser } = userService

	const resetAccess = () => {
		localStorage.removeItem('key')
		localStorage.removeItem('user')
		ctx.key = undefined
		ctx.hasAccess = false
		ctx.userId = null
	}

	onMount(async () => {
		const storedUser = localStorage.getItem('user')
		const storedKey = localStorage.getItem('key')
		const queryKey = page.url.searchParams.get('key')

		if (storedUser) {
			ctx.userId = storedUser
		}

		const key = queryKey ?? storedKey

		if (!key) {
			resetAccess()
			return
		}

		ctx.key = key

		const ok = await validateUser()
		if (!ok) {
			resetAccess()

			if (queryKey) {
				await goto('/', { replaceState: true })
			}

			return
		}

		ctx.hasAccess = true

		if (queryKey) {
			localStorage.setItem('key', queryKey)
			await goto('/', { replaceState: true })
		}

		if (!storedUser) {
			await createUser()
		}
	})

	setWishlistContext(wishlist)
</script>

<Main>
	<Hero />
	<Products />
	<GiftCards />
</Main>
