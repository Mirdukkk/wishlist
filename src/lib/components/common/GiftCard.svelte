<script module lang="ts">
	import type { RGBColorValue } from '$lib/types'

	export interface GiftCardProps {
		name: string
		color: RGBColorValue
		logo: string
		href: string
	}
</script>

<script lang="ts">
	let { name, color, logo, href }: GiftCardProps = $props()
</script>

<div class="gift-card" style:--card-color={color.join(' ')}>
	<a {href} class="gift-card__link" target="_blank" rel="noopener noreferrer">
		<img class="gift-card__logo" draggable="false" src={logo} alt={name} />
	</a>
	<div class="gift-card__glow"></div>
</div>

<style lang="scss">
	.gift-card {
		position: relative;
		height: 160px;
		aspect-ratio: 8 / 5;
		margin-inline-start: -80px;

		@media (max-width: 640px) {
			margin-block-start: 64px;
			margin-inline-start: -160px;
		}

		&__link {
			display: block;
			width: 100%;
			height: 100%;
			padding: 16px;
			border-radius: 16px;
			background: rgb(var(--card-color));
			box-shadow:
				0 0 4px 0 rgb(var(--color-white) / 0.4) inset,
				-4px 0 4px 0 rgb(var(--color-black) / 0.05);
			user-select: none;
			transition: transform var(--duration-long);
			transform: rotate(-14deg);
			transform-origin: bottom right;

			&:hover,
			&:focus-visible {
				transform: rotate(-12deg);
			}

			&:focus-visible {
				outline: 2px solid rgb(var(--card-color));
				outline-offset: 2px;
			}

			@media (max-width: 640px) {
				transform: rotate(-72deg);
				transform-origin: center;

				&:hover,
				&:focus-visible {
					transform: rotate(-72deg) translateX(8px);
				}
			}
		}

		&__logo {
			object-fit: contain;
			max-width: 100%;
			max-height: 100%;
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
