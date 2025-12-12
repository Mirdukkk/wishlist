<script module lang="ts">
	import type { Snippet } from 'svelte'
	import type { ClassValue, HTMLAttributes } from 'svelte/elements'

	export type TextPropsElement =
		| 'dt'
		| 'dd'
		| 'h1'
		| 'h2'
		| 'h3'
		| 'h4'
		| 'h5'
		| 'h6'
		| 'p'
		| 'span'
		| 'strong'
		| 'legend'

	export type HeadingElement = Extract<TextPropsElement, 'h1' | 'h2' | 'h3' | 'h4' | 'h5'>

	export type TextPropsVariant =
		| 'display'
		| 'heading2xl'
		| 'headingXl'
		| 'headingLg'
		| 'headingMd'
		| 'headingSm'
		| 'bodyMd'
		| 'bodySm'
		| 'caption'

	export type HeadingVariant = Extract<
		TextPropsVariant,
		'heading2xl' | 'headingXl' | 'headingLg' | 'headingMd' | 'headingSm'
	>

	export type TextPropsFont = 'base' | 'decorative'

	export type TextPropsColor = 'blue' | 'red' | 'cream' | 'muted' | 'subtle' | 'other'

	export type TextPropsAlignment = 'start' | 'center' | 'end' | 'justify'
	export type TextPropsWeight = 'normal' | 'medium' | 'bold'
	export type TextPropsTracking = 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest'
	export type TextPropsDecoration = 'line-through' | 'underline'

	export interface TextProps extends HTMLAttributes<HTMLElement> {
		alignment?: TextPropsAlignment
		as: TextPropsElement
		breakWord?: boolean
		children: Snippet
		color?: TextPropsColor
		class?: ClassValue
		font?: TextPropsFont
		tracking?: TextPropsTracking
		nobreak?: boolean
		uppercase?: boolean
		variant?: TextPropsVariant
		textDecoration?: TextPropsDecoration
		weight?: TextPropsWeight
	}
</script>

<script lang="ts">
	let {
		alignment,
		as,
		breakWord,
		children,
		color,
		font,
		tracking,
		nobreak,
		uppercase,
		variant,
		textDecoration,
		weight,
		...props
	}: TextProps = $props()

	const defineHeadingVariant = (as: HeadingElement): string | null => {
		const variantMap: Record<HeadingElement, HeadingVariant> = {
			h1: 'heading2xl',
			h2: 'headingXl',
			h3: 'headingLg',
			h4: 'headingMd',
			h5: 'headingSm'
		}

		const headingVariant = variant ?? variantMap[as]
		return headingVariant ? 'text--variant-' + headingVariant : null
	}

	const derivedClasses = $derived.by(() => {
		const textVariant = defineHeadingVariant(as as HeadingElement)

		return {
			'text': true,
			[textVariant as HeadingVariant]: !!textVariant,
			[`text--alignment-${alignment}`]: alignment,
			[`text--color-${color}`]: color,
			[`text--weight-${weight}`]: weight,
			[`text--font-${font}`]: font,
			[`text--decoration-${textDecoration}`]: textDecoration,
			[`text--tracking-${tracking}`]: tracking,
			'text--uppercase': uppercase,
			'text--nobreak': nobreak,
			'text--break': breakWord
		}
	})
</script>

<svelte:element this={as} {...props} class={derivedClasses}>
	{@render children()}
</svelte:element>

<style lang="scss">
	.text {
		letter-spacing: 0.6px;
		text-align: inherit;

		&--alignment {
			&-start {
				text-align: start;
			}

			&-center {
				text-align: center;
			}

			&-end {
				text-align: end;
			}

			&-justify {
				text-align: justify;
			}
		}

		&--color {
			&-blue {
				color: rgb(var(--color-blue));
			}

			&-red {
				color: rgb(var(--color-red));
			}

			&-cream {
				color: rgb(var(--color-cream));
			}

			&-muted {
				color: rgb(var(--color-muted));
			}

			&-subtle {
				color: rgb(var(--color-subtle));
			}
		}

		&--variant {
			&-display {
				font: var(--font-display);
				letter-spacing: 1px;
			}

			&-heading2xl {
				font: var(--font-heading-2xl);
				letter-spacing: 0;
			}

			&-headingXl {
				font: var(--font-heading-xl);
				letter-spacing: 0;
			}

			&-headingLg {
				font: var(--font-heading-lg);
				letter-spacing: 0;
			}

			&-headingMd {
				font: var(--font-heading-md);
				letter-spacing: 0;
			}

			&-headingSm {
				font: var(--font-heading-sm);
				letter-spacing: 0;
			}

			&-bodyMd {
				font: var(--font-body-md);
			}

			&-bodySm {
				font: var(--font-body-sm);
				letter-spacing: 0.5px;
			}

			&-caption {
				font: var(--font-caption);
				letter-spacing: 0.4px;
			}
		}

		&--font {
			&-decorative {
				font-family: var(--font-family-decorative);
			}

			&-base {
				font-family: var(--font-family-base);
			}
		}

		&--weight {
			&-normal {
				font-weight: 400;
			}

			&-medium {
				font-weight: 500;
			}

			&-bold {
				font-weight: 700;
			}
		}

		&--decoration {
			&-line-through {
				text-decoration: line-through;
			}

			&-underline {
				text-decoration: underline;
			}
		}

		&--tracking {
			&-tighter {
				letter-spacing: -0.05em;
			}

			&-tight {
				letter-spacing: -0.025em;
			}

			&-normal {
				letter-spacing: 0;
			}

			&-wide {
				letter-spacing: 0.025em;
			}

			&-wider {
				letter-spacing: 0.05em;
			}

			&-widest {
				letter-spacing: 0.1em;
			}
		}

		&--uppercase {
			text-transform: uppercase;
		}

		&--nobreak {
			white-space: nowrap;
		}

		&--break {
			word-break: normal;
			overflow-wrap: anywhere;
		}
	}
</style>
