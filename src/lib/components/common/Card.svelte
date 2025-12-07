<script module lang="ts">
	export interface CardProps {
		name: string
		image: string
		caption?: string
		price?: number
		flipped?: boolean
	}
</script>

<script lang="ts">
	import { formatPrice } from '$lib/utils/format-price'

	import Text from '$lib/components/typography/Text.svelte'

	let { name, image, caption, price, flipped }: CardProps = $props()
	let cardFrame = $derived.by(() => {
		if (!price) return

		if (price <= 500) return 1
		if (price <= 1000) return 2
		if (price <= 2000) return 3
		return 4
	})
</script>

<button type="button" class={`card card--frame-${cardFrame}`} class:card--flipped={flipped}>
	<div class="card__wrapper">
		<div class="card__front">
			<div class="card__inner">
				<img
					alt={name}
					src={image}
					width={192}
					height={192}
					draggable="false"
					class="card__image"
				/>
				<div class="card__info">
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
		<div class="card__back">
			<div class="card__pattern"></div>
		</div>
	</div>
</button>

<style lang="scss">
	.card {
		all: unset;
		position: relative;
		box-sizing: border-box;
		width: 100%;
		aspect-ratio: 5 / 7;
		cursor: pointer;
		user-select: none;
		perspective: 100vh;

		&:active {
			.card__wrapper {
				transition: transform var(--duration-long);
			}
		}

		&:hover:not(.card--flipped) {
			.card__wrapper {
				transition: transform var(--duration-long);
				transform: rotateY(6deg) scale(1.02);
			}
		}

		&:active:not(.card--flipped) {
			.card__wrapper {
				transform: rotateY(6deg) scale(1);
			}
		}

		&--frame {
			&-1 {
				.card__front {
					background-image: url('/images/card/frame-1.svg');
				}
			}

			&-2 {
				.card__front {
					background-image: url('/images/card/frame-2.svg');
				}
			}

			&-3 {
				.card__front {
					background-image: url('/images/card/frame-3.svg');
				}
			}

			&-4 {
				.card__front {
					background-image: url('/images/card/frame-4.svg');
				}
			}
		}

		&--flipped {
			.card__wrapper {
				transform: rotateY(180deg);
			}

			&:hover {
				.card__wrapper {
					transform: rotateY(0deg) scale(1.02);
				}
			}

			&:active {
				.card__wrapper {
					transform: rotateY(0deg) scale(1);
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
			background-image: url('/images/card/back-pattern.svg');
			background-size: cover;
		}
	}
</style>
