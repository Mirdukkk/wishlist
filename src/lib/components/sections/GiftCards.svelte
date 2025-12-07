<script lang="ts">
	import Section from '$lib/components/layout/Section.svelte'
	import Text from '$lib/components/typography/Text.svelte'
	import GiftCard, { type GiftCardProps } from '$lib/components/common/GiftCard.svelte'

	const giftCards: GiftCardProps[] = [
		{
			name: 'Золотое Яблоко',
			color: [219, 254, 0],
			logo: '/images/logos/gold-apple.svg',
			href: 'https://goldapple.ru/cards'
		},
		{
			name: 'Skuratov Coffee',
			color: [208, 204, 201],
			logo: '/images/logos/skuratov.svg',
			href: 'https://skuratovcoffee.ru/shop/card'
		},
		{
			name: 'Ozon',
			color: [0, 105, 255],
			logo: '/images/logos/ozon.svg',
			href: 'https://www.ozon.ru/landing/giftcertificates/'
		}
	]
</script>

<Section name="gift-cards">
	<Text as="h3" alignment="center">Или купить подарочную карту</Text>
	<div class="gift-cards__overflow">
		<div class="gift-cards__row">
			{#each giftCards as giftCard}
				<GiftCard {...giftCard} />
			{/each}
		</div>
	</div>
</Section>

<style lang="scss">
	.gift-cards {
		&__overflow {
			overflow-x: clip;
			width: calc(100% + 32px);
			margin-inline: -16px;
			margin-block-end: 80px;
		}

		&__row {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-block-start: 36px;
			margin-inline-start: 112px;

			@media (max-width: 640px) {
				margin-inline-start: 160px;
			}
		}
	}
</style>
