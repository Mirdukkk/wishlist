<script module lang="ts">
	export interface ProductProps {
		id: string
		name: string
		image: string
		caption?: string
		price?: number
		flipped?: boolean
		onclick?: () => void
	}
</script>

<script lang="ts">
	import { formatPrice } from '$lib/utils'

	import Text from '$lib/components/typography/Text.svelte'

	let { name, image, caption, price, flipped, onclick }: ProductProps = $props()
	let productFrame = $derived.by(() => {
		if (!price) return

		if (price <= 500) return 1
		if (price <= 1000) return 2
		if (price <= 2000) return 3
		return 4
	})
</script>

<button
	type="button"
	class={`product product--frame-${productFrame}`}
	aria-label="Открыть товар {name}"
	class:product--flipped={flipped}
	{onclick}
>
	<article class="product__wrapper">
		<div class="product__front">
			<div class="product__inner">
				<img
					alt={name}
					src={image}
					width={192}
					height={192}
					draggable="false"
					class="product__image"
				/>
				<div class="product__info">
					<Text as="h2" font="decorative" tone="accent">{name}</Text>
					{#if caption}
						<Text as="p" weight="medium">{caption}</Text>
					{/if}
					{#if price}
						<Text as="p" variant="headingSm">{formatPrice(price)}</Text>
					{/if}
				</div>
			</div>
		</div>
		<div class="product__back">
			<div class="product__pattern"></div>
		</div>
	</article>
</button>

<style lang="scss">
	.product {
		all: unset;
		position: relative;
		box-sizing: border-box;
		width: 100%;
		aspect-ratio: 5 / 7;
		border-radius: 16px;
		cursor: pointer;
		user-select: none;
		perspective: 100vh;

		&:active {
			.product__wrapper {
				transition: transform var(--duration-long);
			}
		}

		&:hover:not(.product--flipped) {
			.product__wrapper {
				transition: transform var(--duration-long);
				transform: scale(1.02);
			}
		}

		&:active:not(.product--flipped) {
			.product__wrapper {
				transform: scale(1);
			}
		}

		&:focus-visible {
			outline: 2px solid rgb(var(--color-accent));
			outline-offset: 2px;
		}

		&--frame {
			&-1 {
				.product__front {
					background-image: url('/images/product/frame-1.svg');
				}
			}

			&-2 {
				.product__front {
					background-image: url('/images/product/frame-2.svg');
				}
			}

			&-3 {
				.product__front {
					background-image: url('/images/product/frame-3.svg');
				}
			}

			&-4 {
				.product__front {
					background-image: url('/images/product/frame-4.svg');
				}
			}
		}

		&--flipped {
			.product__wrapper {
				transform: rotateY(180deg);
			}

			&:hover {
				.product__wrapper {
					transform: scale(1.02);
				}
			}

			&:active {
				.product__wrapper {
					transform: scale(1);
				}
			}
		}

		&__wrapper {
			position: relative;
			width: 100%;
			height: 100%;
			transition: transform var(--duration-max);
			transform-style: preserve-3d;
		}

		&__front {
			z-index: 2;
			background: rgb(var(--color-content));
		}

		&__back {
			background: rgb(var(--color-accent));
			transform: rotateY(180deg);
		}

		&__front,
		&__back {
			position: absolute;
			top: 0;
			left: 0;
			box-sizing: border-box;
			width: 100%;
			height: 100%;
			padding: 12px;
			border-radius: 16px;
			background-position: center;
			background-size: cover;
			background-repeat: no-repeat;
			backface-visibility: hidden;
		}

		&__inner {
			display: flex;
			flex-direction: column;
			gap: 20px;
			justify-content: center;
			align-items: center;
			height: 100%;
			padding: 16px;
			border: none;
			border-radius: 6px;
			background: rgb(var(--color-content));
			color: rgb(var(--color-background));
			text-align: center;
		}

		&__image {
			width: auto;
			height: 192px;
			border-radius: 6px;
		}

		&__info {
			display: flex;
			flex-direction: column;
			gap: 8px;
		}

		&__pattern {
			width: 100%;
			height: 100%;
			border: 3px solid rgb(var(--color-content));
			border-radius: 6px;
			background-image: url('/images/product/back-pattern.svg');
			background-size: cover;
		}
	}
</style>
