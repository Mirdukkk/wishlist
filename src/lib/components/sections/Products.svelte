<script lang="ts">
	import { page } from '$app/state'
	import { goto } from '$app/navigation'
	import type { Product } from '$lib/types'

	import Section from '$lib/components/layout/Section.svelte'
	import Grid from '$lib/components/layout/Grid.svelte'
	import ProductCard from '$lib/components/common/ProductCard.svelte'
	import Dialog from '$lib/components/layout/Dialog.svelte'
	import Text from '$lib/components/typography/Text.svelte'
	import IconClose from '$lib/components/graphics/IconClose.svelte'
	import Button from '$lib/components/common/Button.svelte'

	const products: Product[] = [
		{
			id: 'kinder-bueno',
			name: 'Киндер Буено',
			image: 'https://placehold.co/192',
			shortDescription: 'Вкусни шоколадка',
			price: 1000,
			link: 'https://example.com/kinder-bueno'
		},
		{
			id: 'snickers',
			name: 'Сникерс',
			image: 'https://placehold.co/192',
			shortDescription: 'Шоколад с карамел',
			price: 1200,
			link: 'https://example.com/kinder-bueno'
		},
		{
			id: 'mars',
			name: 'Марс',
			image: 'https://placehold.co/192',
			shortDescription: 'Класически шоколад',
			price: 900,
			link: 'https://example.com/kinder-bueno'
		}
	]
</script>

<Section name="products">
	<Grid>
		{#each products as product}
			<ProductCard flipped={product.reserved} {...product} onclick={() => goto(`#${product.id}`)} />
			<Dialog bind:open={() => page.url.hash.slice(1) === product.id, () => goto('')}>
				{#snippet children({ close })}
					<div class="product-dialog__heading">
						<Text as="h1" font="decorative" color="red">
							{product.name}
						</Text>
						<button type="button" class="product-dialog__close" onclick={close}>
							<IconClose />
						</button>
					</div>
					<img class="product-dialog__image" src={product.image} alt={product.name} />
					<div class="product-dialog__actions">
						<Button>Забронировать</Button>
						{#if product.link}
							<Button variant="outline" href={product.link} target="_blank">Купить</Button>
						{/if}
					</div>
				{/snippet}
			</Dialog>
		{/each}
	</Grid>
</Section>

<style lang="scss">
	.product-dialog {
		&__heading {
			display: flex;
			justify-content: space-between;
			margin-bottom: 36px;
		}

		&__close {
			all: unset;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 32px;
			height: 32px;
			border-radius: 50%;
			background: rgb(var(--color-red) / 0.1);
			color: rgb(var(--color-red));
			cursor: pointer;
			transition: background var(--duration-default);

			&:hover {
				background: rgb(var(--color-red) / 0.15);
			}

			&:active {
				background: rgb(var(--color-red) / 0.2);
			}
		}

		&__actions {
			display: flex;
			gap: 8px;
		}

		&__action {
			all: unset;
			cursor: pointer;
		}

		&__image {
			margin-bottom: 24px;
		}
	}
</style>
