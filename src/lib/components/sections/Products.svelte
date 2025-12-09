<script lang="ts">
	import { page } from '$app/state'
	import { goto } from '$app/navigation'
	import type { Product } from '$lib/types'
	import { formatPrice } from '$lib/utils'

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
			longDescription:
				'Сумка-кофр выполнена из плащевой ткани с мембраной. Сумку можно носить как на лицевую, так и наизнанку.',
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
					<button type="button" class="product-dialog__close" onclick={close}>
						<IconClose />
					</button>

					<div class="product-dialog__start">
						<div class="product-dialog__wrapper">
							<Text as="h1" font="decorative" color="red">
								{product.name}
							</Text>
							<div class="product-dialog__info">
								{#if product.longDescription}
									<Text as="p">
										{product.longDescription}
									</Text>
								{/if}
								{#if product.price}
									<Text as="p" variant="headingSm">
										{formatPrice(product.price)}
									</Text>
								{/if}
							</div>
						</div>
						<div class="product-dialog__actions">
							<Button block>Забронировать</Button>
							{#if product.link}
								<Button variant="outline" href={product.link} target="_blank">Купить</Button>
							{/if}
						</div>
					</div>
					<hr class="product-dialog__hr" aria-orientation="vertical" />
					<div class="product-dialog__container">
						<img
							class="product-dialog__image"
							src={product.image}
							alt={product.name}
							width={256}
							height={256}
						/>
					</div>
				{/snippet}
			</Dialog>
		{/each}
	</Grid>
</Section>

<style lang="scss">
	.product-dialog {
		&__close {
			all: unset;
			position: absolute;
			top: 24px;
			right: 24px;
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

			@media (max-width: 640px) {
				top: 16px;
				right: 16px;
			}
		}

		&__start {
			display: flex;
			flex-direction: column;
			gap: 24px;
			justify-content: space-between;
			width: 100%;
		}

		&__wrapper {
			display: flex;
			flex-direction: column;
			gap: 16px;
		}

		&__info {
			display: flex;
			flex-direction: column;
			gap: 12px;
		}

		&__actions {
			display: flex;
			gap: 8px;
			width: 100%;
		}

		&__action {
			all: unset;
			cursor: pointer;
		}

		&__container {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		&__image {
			min-width: 256px;
			height: auto;
		}

		&__hr {
			border: 1px solid rgb(var(--color-red));
		}
	}
</style>
