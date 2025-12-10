<script lang="ts">
	import type { Snippet } from 'svelte'

	interface SectionProps {
		name: string
		children: Snippet
	}

	let { name, children }: SectionProps = $props()
</script>

<section id={name} class={`section ${name}`}>
	{@render children()}
</section>

<style lang="scss">
	.section {
		margin-block-end: 64px;

		@media (max-width: 1024px) {
			margin-block-end: 56px;
		}

		&:last-child {
			margin-block-end: 0;
		}
	}
</style>
