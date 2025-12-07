<script lang="ts">
	import { page } from '$app/state'
	import { goto } from '$app/navigation'

	import Section from '$lib/components/layout/Section.svelte'
	import Grid from '$lib/components/layout/Grid.svelte'
	import Product, { type ProductProps } from '$lib/components/common/Product.svelte'
	import Dialog from '$lib/components/layout/Dialog.svelte'
	import Text from '$lib/components/typography/Text.svelte'

	const products: ProductProps[] = [
		{
			id: 'kinder-bueno',
			name: 'Киндер Буено',
			image: 'https://placehold.co/192',
			caption: 'Вкусни шоколадка',
			price: 1000
		},
		{
			id: 'snickers',
			name: 'Сникерс',
			image: 'https://placehold.co/192',
			caption: 'Шоколад с карамел',
			price: 1200
		},
		{
			id: 'mars',
			name: 'Марс',
			image: 'https://placehold.co/192',
			caption: 'Класически шоколад',
			price: 900
		}
	]
</script>

<Section name="products">
	<Grid>
		{#each products as product}
			<Product {...product} onclick={() => goto(`#${product.id}`)} />
			<Dialog bind:open={() => page.url.hash.slice(1) === product.id, () => goto('')}>
				{#snippet children({ close })}
					<div class="product-dialog__heading">
						<Text as="h1" font="decorative">
							{product.name}
						</Text>
						<button type="button" class="product-dialog__close" onclick={close}>Закрыть</button>
					</div>
					<img class="product-dialog__image" src={product.image} alt={product.name} />
					<div class="product-dialog__actions">
						<button type="button" class="product-dialog__action"> Забронировать </button>
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
			align-items: center;
			margin-bottom: 36px;
		}

		&__close {
			all: unset;
			cursor: pointer;
		}

		&__actions {
			display: flex;
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
