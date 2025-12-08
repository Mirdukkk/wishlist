<script lang="ts">
	import type { Snippet } from 'svelte'
	import { fade } from 'svelte/transition'
	import { Dialog } from 'bits-ui'

	interface DialogProps {
		children: Snippet<[{ close: () => void }]>
		open?: boolean
	}

	let { children, open = $bindable(false) }: DialogProps = $props()
</script>

<Dialog.Root bind:open>
	<Dialog.Portal>
		<Dialog.Overlay forceMount>
			{#snippet child({ props, open })}
				{#if open}
					<div class="dialog__overlay" {...props} transition:fade={{ duration: 100 }}></div>
				{/if}
			{/snippet}
		</Dialog.Overlay>
		<Dialog.Content forceMount>
			{#snippet child({ props, open: isOpen })}
				{#if isOpen}
					<div class="dialog__container" transition:fade={{ duration: 100 }}>
						<div {...props} class="dialog__inner">
							<div class="dialog__content">
								{@render children({ close: () => (open = false) })}
							</div>
						</div>
					</div>
				{/if}
			{/snippet}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>

<style lang="scss">
	.dialog {
		&__overlay {
			position: fixed;
			inset: 0;
			z-index: 10;
			height: 100vh;
			background: rgb(var(--color-black) / 0.6);
		}

		&__container {
			position: fixed;
			top: 50%;
			left: 50%;
			z-index: 20;
			width: 100%;
			padding: 16px;
			transform: translate(-50%, -50%);

			@media (max-width: 640px) {
				top: auto;
				bottom: 0;
				left: 0;
				padding: 0;
				transform: none;
			}
		}

		&__inner {
			width: 100%;
			max-width: 680px;
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
			padding: 24px;
			border-radius: 12px;
			background: rgb(var(--color-cream));

			@media (max-width: 640px) {
				border-radius: 0;
			}
		}
	}
</style>
