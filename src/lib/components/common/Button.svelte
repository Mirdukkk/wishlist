<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'

	import LoadingSpinner from '$lib/components/feedback/LoadingSpinner.svelte'

	type ButtonVariant = 'default' | 'accent' | 'outline'

	type AnchorElement = Omit<HTMLAnchorAttributes, 'href' | 'type'> & {
		href: HTMLAnchorAttributes['href']
		type?: never
		loading?: never
		disabled?: HTMLButtonAttributes['disabled']
	}

	type ButtonElement = Omit<HTMLButtonAttributes, 'type' | 'href'> & {
		type?: HTMLButtonAttributes['type']
		href?: never
		loading?: boolean
		disabled?: HTMLButtonAttributes['disabled']
	}

	type ButtonProps = (AnchorElement | ButtonElement) & {
		children?: Snippet
		variant?: ButtonVariant
		block?: boolean
	}

	let {
		href,
		type,
		loading,
		children,
		disabled = false,
		variant = 'default',
		block,
		...props
	}: ButtonProps = $props()

	const isLoading = $derived(href ? false : loading)
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	type={href ? undefined : type}
	href={href && !disabled ? href : undefined}
	aria-disabled={href ? disabled : undefined}
	role={href && disabled ? 'link' : undefined}
	tabindex={href && disabled ? -1 : 0}
	disabled={href ? undefined : disabled}
	class="button button--variant-{variant}"
	class:button--block={block}
	class:button--loading={isLoading}
	{...props}
>
	{#if isLoading}
		<div class="button__loading">
			<LoadingSpinner />
		</div>
	{:else}
		{@render children?.()}
	{/if}
</svelte:element>

<style lang="scss">
	.button {
		all: unset;
		position: relative;
		display: inline-flex;
		gap: 8px;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		height: 48px;
		padding-inline: 20px;
		border-radius: 36px;
		font: 700 var(--font-body-sm);
		white-space: nowrap;
		transition: background-color var(--duration-default);

		&:not(:disabled),
		&:not(:disabled):not([readonly]) {
			cursor: pointer;
		}

		&:disabled {
			opacity: 0.5;
			cursor: default;
			pointer-events: none;
			user-select: none;
		}

		&--variant {
			&-default {
				background: rgb(var(--color-blue));
				color: rgb(var(--color-cream));

				&:hover,
				&:focus-visible {
					background: rgb(var(--color-blue) / 0.85);
				}

				&:active {
					background: rgb(var(--color-blue) / 0.8);
				}
			}

			&-accent {
				background: rgb(var(--color-red));
				color: rgb(var(--color-cream));

				&:hover,
				&:focus-visible {
					background: rgb(var(--color-red) / 0.85);
				}

				&:active {
					background: rgb(var(--color-red) / 0.8);
				}
			}

			&-outline {
				border: 2px solid rgb(var(--color-blue));
				background: transparent;
				color: rgb(var(--color-blue));

				&:hover,
				&:focus-visible {
					background: rgb(var(--color-blue) / 0.05);
				}

				&:active {
					background: rgb(var(--color-blue) / 0.1);
				}
			}
		}

		&--block {
			width: 100%;
		}

		&__loading {
			position: absolute;
			top: 0;
			left: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;
			border-radius: inherit;
			background: inherit;
		}
	}
</style>
