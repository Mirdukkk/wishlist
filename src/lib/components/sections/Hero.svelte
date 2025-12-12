<script lang="ts">
	import { getWishlistContext } from '$lib/context/wishlist'

	import Section from '$lib/components/layout/Section.svelte'
	import Text from '$lib/components/typography/Text.svelte'
	import Filters from '$lib/components/common/Filters.svelte'

	const ctx = getWishlistContext()
</script>

<Section name="hero">
	<div class="hero__container">
		<div class="hero__top">
			<img class="hero__image" src="/images/me.webp" alt="Я" width="256" height="256" />
			<Text class="hero__name" as="p" weight="bold" alignment="center">Егор</Text>
		</div>
		<div class="hero__title">
			<Text as="h1" variant="display" alignment="center">Мой вишлист</Text>
		</div>
		<div class="hero__filters">
			<Filters bind:value={ctx.filterBy} />
		</div>
	</div>
</Section>

<style lang="scss">
	.hero {
		&__container {
			display: flex;
			flex-direction: column;
			gap: 48px;

			@media (max-width: 640px) {
				gap: 36px;
			}
		}

		&__top {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		&__image {
			width: 64px;
			height: 64px;
			border-radius: 50%;
			margin-block-end: 16px;
		}
	}
</style>
