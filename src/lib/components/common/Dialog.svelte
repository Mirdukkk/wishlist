<script lang="ts">
	import type { Snippet } from 'svelte'
	import { fade } from 'svelte/transition'
	import { backInOut } from 'svelte/easing'
	import type { GiftCard, Product } from '$lib/types'
	import { formatPrice } from '$lib/utils'
	import { Dialog } from 'bits-ui'

	import Text from '$lib/components/typography/Text.svelte'
	import IconClose from '$lib/components/graphics/IconClose.svelte'

	type ProductDialog = {
		item: Product
		side?: never
	}

	type GiftCardDialog = {
		item: GiftCard
		side: Snippet
	}

	type DialogProps = (ProductDialog | GiftCardDialog) & {
		open?: boolean
		actions: Snippet<[{ close: () => void }]>
	}

	const whoosh = (node: HTMLElement) => {
		const existingTransform = getComputedStyle(node).transform.replace('none', '')

		return {
			delay: 0,
			duration: 500,
			easing: backInOut,
			css: (t: number) => `
				opacity: ${t};
				transform: ${existingTransform}
				translateY(${(1 - t) * 300}px)
				rotate(${(1 - t) * 10}deg);
			`
		}
	}

	let { open = $bindable(false), item, actions, side }: DialogProps = $props()
</script>

<Dialog.Root bind:open>
	<Dialog.Portal>
		<Dialog.Overlay forceMount>
			{#snippet child({ props, open })}
				{#if open}
					<div class="overlay" {...props} transition:fade={{ duration: 300 }}></div>
				{/if}
			{/snippet}
		</Dialog.Overlay>
		<Dialog.Content forceMount>
			{#snippet child({ props, open: isOpen })}
				{#if isOpen}
					<div {...props} class="dialog">
						<div class="dialog__frame" transition:whoosh>
							<div class="dialog__content">
								<button type="button" class="dialog__close" onclick={() => (open = false)}>
									<IconClose />
								</button>
								<div class="dialog__main">
									<div class="dialog__wrapper">
										<Text as="h1" font="decorative" color="red">
											{item.name}
										</Text>
										<div class="dialog__info">
											{#if item.longDescription}
												<Text as="p">
													{item.longDescription}
												</Text>
											{/if}
											{#if item.type === 'product' && item.price}
												<Text as="p" variant="headingSm">
													{formatPrice(item.price)}
												</Text>
											{/if}
										</div>
									</div>
									<div class="dialog__actions">
										{@render actions({ close: () => (open = false) })}
									</div>
								</div>
								<hr class="dialog__separator" aria-orientation="vertical" />
								<div class="dialog__side">
									{#if item.type === 'product'}
										<img
											class="product-dialog__image"
											src={item.image}
											alt={item.name}
											width={256}
											height={256}
										/>
									{:else if item.type === 'gift-card'}
										{@render side?.()}
									{/if}
								</div>
							</div>
						</div>
					</div>
				{/if}
			{/snippet}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>

<style lang="scss">
	.overlay {
		position: fixed;
		inset: 0;
		z-index: 10;
		height: 100vh;
		background: rgb(var(--color-black) / 0.6);
	}

	.dialog {
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 20;
		width: 100%;
		max-width: 712px;
		padding: 16px;
		transform: translate(-50%, -50%);

		@media (max-width: 640px) {
			top: auto;
			bottom: 0;
			left: 0;
			padding: 0;
			transform: none;
		}

		&__frame {
			width: 100%;
			margin-inline: auto;
			padding: 12px;
			border-radius: 20px;
			background: repeating-linear-gradient(
				135deg,
				rgb(var(--color-red)) 0 32px,
				rgb(var(--color-cream)) 0 64px
			);
			color: rgb(var(--color-blue));

			@media (max-width: 640px) {
				border-radius: 0;
			}
		}

		&__content {
			position: relative;
			display: flex;
			gap: 24px;
			overflow: hidden;
			padding: 24px;
			border-radius: 12px;
			background: rgb(var(--color-cream));

			@media (max-width: 640px) {
				flex-direction: column-reverse;
				padding: 16px;
				border-radius: 0;
			}
		}

		&__close {
			all: unset;
			position: absolute;
			top: 24px;
			right: 24px;
			z-index: 5;
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

		&__main {
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

		&__separator {
			border: 1px solid rgb(var(--color-red));
		}

		&__side {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		&__image {
			min-width: 256px;
			height: auto;
		}
	}
</style>
