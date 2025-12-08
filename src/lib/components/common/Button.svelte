<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'

	type ButtonVariant = 'default' | 'outline'

	type AnchorElement = Omit<HTMLAnchorAttributes, 'href' | 'type'> & {
		href: HTMLAnchorAttributes['href']
		type?: never
		disabled?: HTMLButtonAttributes['disabled']
	}

	type ButtonElement = Omit<HTMLButtonAttributes, 'type' | 'href'> & {
		type?: HTMLButtonAttributes['type']
		href?: never
		disabled?: HTMLButtonAttributes['disabled']
	}

	type ButtonProps = (AnchorElement | ButtonElement) & {
		children?: Snippet
		variant?: ButtonVariant
	}

	let {
		href,
		type,
		children,
		disabled = false,
		variant = 'default',
		...props
	}: ButtonProps = $props()
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	type={href ? undefined : type}
	href={href && !disabled ? href : undefined}
	aria-disabled={href ? disabled : undefined}
	role={href && disabled ? 'link' : undefined}
	tabindex={href && disabled ? -1 : 0}
	class="button button--variant-{variant}"
	{...props}
>
	{@render children?.()}
</svelte:element>

<style lang="scss">
	.button {
		all: unset;
		display: inline-flex;
		gap: 8px;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		height: 48px;
		padding-inline: 20px;
		border-radius: 36px;
		font-weight: 700;
		cursor: pointer;
		transition: background-color var(--duration-default);

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

		&:disabled {
			opacity: 0.7;
			cursor: default;
		}
	}
</style>
