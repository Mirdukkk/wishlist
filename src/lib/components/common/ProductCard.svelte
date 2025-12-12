<script lang="ts">
	import type { ProductSummary } from '$lib/types'
	import { formatPrice } from '$lib/utils'

	import Text from '$lib/components/typography/Text.svelte'

	interface ProductCardProps extends ProductSummary {
		flipped?: boolean
		onclick?: () => void
	}

	let { name, image, price, flipped, onclick }: ProductCardProps = $props()

	let productCardFrame = $derived.by(() => {
		if (!price) return

		if (price <= 1000) return 1
		if (price <= 2000) return 2
		return 3
	})
</script>

<button
	type="button"
	class={`product-card product-card--frame-${productCardFrame}`}
	aria-label="Открыть товар {name}"
	class:product-card--flipped={flipped}
	{onclick}
>
	<article class="product-card__wrapper">
		<div class="product-card__front">
			<div class="product-card__inner">
				<img
					alt={name}
					src={image}
					width={192}
					height={192}
					draggable="false"
					fetchpriority="high"
					class="product-card__image"
				/>
				<div class="product-card__info">
					<Text as="h2" font="decorative" color="red">{name}</Text>
					{#if price}
						<Text as="p" variant="headingSm">{formatPrice(price)}</Text>
					{/if}
				</div>
			</div>
		</div>
		<div class="product-card__back">
			<div class="product-card__pattern"></div>
		</div>
	</article>
</button>

<style lang="scss">
	.product-card {
		all: unset;
		position: relative;
		display: block;
		box-sizing: border-box;
		width: 290px;
		aspect-ratio: 5 / 7;
		border-radius: 16px;
		cursor: pointer;
		user-select: none;
		perspective: 100vh;

		&:hover {
			.product-card__image {
				animation-play-state: running;
			}
		}

		&:active {
			.product-card__wrapper {
				transition: transform var(--duration-long);
			}
		}

		&:hover:not(.product-card--flipped) {
			.product-card__wrapper {
				transition: transform var(--duration-long);
				transform: scale(1.02);
			}
		}

		&:active:not(.product-card--flipped) {
			.product-card__wrapper {
				transform: scale(1);
			}
		}

		&:focus-visible {
			outline: 2px solid rgb(var(--color-red));
			outline-offset: 2px;
		}

		&--frame {
			&-1 {
				.product-card__front {
					background-image: url('/images/elements/frame-1.svg');
				}
			}

			&-2 {
				.product-card__front {
					background-image: url('/images/elements/frame-2.svg');
				}
			}

			&-3 {
				.product-card__front {
					background-image: url('/images/elements/frame-3.svg');
				}
			}
		}

		&--flipped {
			.product-card__wrapper {
				transform: rotateY(180deg);
			}

			&:hover {
				.product-card__wrapper {
					transform: scale(1.02);
				}
			}

			&:active {
				.product-card__wrapper {
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

		&--no-transition {
			.product-card__wrapper {
				transition: none;
			}
		}

		&__front {
			z-index: 2;
			background: rgb(var(--color-cream));
		}

		&__back {
			background: rgb(var(--color-red));
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
			gap: 28px;
			justify-content: center;
			align-items: center;
			height: 100%;
			padding: 12px;
			border: none;
			border-radius: 6px;
			background: rgb(var(--color-cream));
			color: rgb(var(--color-blue));
			text-align: center;
		}

		&__image {
			width: auto;
			height: 192px;
			border-radius: 6px;
			animation: animation-snap 0.75s steps(1, end) infinite paused;
		}

		&__info {
			display: flex;
			flex-direction: column;
			gap: 12px;
		}

		&__pattern {
			width: 100%;
			height: 100%;
			border: 3px solid rgb(var(--color-cream));
			border-radius: 6px;
			background-image: url('/images/elements/back-pattern.svg');
			background-size: cover;
		}
	}

	@keyframes animation-snap {
		0% {
			transform: rotate(0deg);
		}

		1% {
			transform: rotate(5deg);
		}

		50% {
			transform: rotate(5deg);
		}

		51% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(0deg);
		}
	}
</style>
