<script lang="ts">
	import { onMount } from 'svelte'
	import { page } from '$app/state'
	import { type WishlistContext, setWishlistContext } from '$lib/context/wishlist'

	import Main from '$lib/components/layout/Main.svelte'
	import Hero from '$lib/components/sections/Hero.svelte'
	import Products from '$lib/components/sections/Products.svelte'
	import GiftCards from '$lib/components/sections/GiftCards.svelte'

	let wishlist: WishlistContext = $state({
		userId: null,
		reservations: page.data.reservations,
		filterBy: 'all',
		loading: false
	})

	const ctx = wishlist

	onMount(async () => {
		const storedUser = localStorage.getItem('user')

		if (storedUser) {
			ctx.userId = storedUser
		}
	})

	setWishlistContext(wishlist)
</script>

<Main>
	<Hero />
	<Products />
	<GiftCards />
</Main>
