<script lang="ts">
	import type { GiftCard } from '$lib/types/items'

	export type GiftCardProps = Pick<GiftCard, 'name' | 'color' | 'logo'> & {
		dimmed?: boolean
		onclick?: () => void
	}

	let { name, color, logo, dimmed, onclick }: GiftCardProps = $props()
</script>

<svelte:element
	this={onclick ? 'article' : 'div'}
	class="gift-card"
	class:gift-card--interactive={!!onclick}
	class:gift-card--dimmed={dimmed}
	style:--card-color={color.join(' ')}
>
	<svelte:element
		this={onclick ? 'button' : 'div'}
		class="gift-card__element"
		type={onclick && 'button'}
		aria-label={onclick && `Открыть карту ${name}`}
		role={onclick && 'button'}
		{onclick}
	>
		<div>
			<img class="gift-card__logo" draggable="false" src={logo} alt={name} />
		</div>
	</svelte:element>
	<div class="gift-card__glow"></div>
</svelte:element>

<style lang="scss">
	.gift-card {
		position: relative;
		height: 160px;
		aspect-ratio: 8 / 5;
		transition: transform var(--duration-long);
		transform: rotate(-14deg);

		@media (max-width: 640px) {
			transform: rotate(-72deg);
		}

		&--interactive {
			height: 144px;
			transform-origin: bottom right;
			margin-inline-start: -80px;

			&:hover,
			&:focus-visible {
				transform: rotate(-12deg);
			}

			@media (max-width: 640px) {
				transform-origin: center;
				margin-block-start: 64px;
				margin-inline-start: -144px;

				&:hover,
				&:focus-visible {
					transform: rotate(-72deg) translateX(8px);
				}
			}

			.gift-card__element {
				cursor: pointer;

				&:focus-visible {
					outline: 2px solid rgb(var(--card-color));
					outline-offset: 2px;
				}
			}
		}

		&--dimmed {
			filter: brightness(0.5);
		}

		&__element {
			all: unset;
			display: flex;
			width: 100%;
			height: 100%;
			padding: 16px;
			border-radius: 16px;
			background: rgb(var(--card-color));
			box-shadow:
				0 0 4px 0 rgb(var(--color-white) / 0.4) inset,
				-4px 0 4px 0 rgb(var(--color-black) / 0.05);
			user-select: none;
		}

		&__glow {
			position: absolute;
			inset: 0;
			z-index: -1;
			width: 100%;
			height: 100%;
			background: rgb(var(--card-color) / 0.3);
			filter: blur(96px);
		}
	}
</style>
