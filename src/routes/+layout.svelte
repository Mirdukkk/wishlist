<script lang="ts">
	import '../styles/global.scss'
	import favicon from '$lib/assets/favicon.svg'

	import Background from '$lib/components/background/Background.svelte'

	let { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="layout">
	<div class="layout__background">
		<Background />
	</div>
	<div class="layout__content">
		{@render children()}
	</div>
</div>

<style lang="scss">
	.layout {
		display: flex;
		flex-direction: column;
		max-width: 1200px;
		height: 100%;
		min-height: 100vh;
		margin-inline: auto;
		padding-inline: 16px;

		&__background {
			position: absolute;
			inset: 0;
			overflow: hidden;
			width: 100%;
			height: 240px;
			margin-inline: auto;
		}

		&__content {
			position: relative;
			flex: 1;
			margin-block-start: 40px;

			@media (max-width: 640px) {
				margin-block-start: 20px;
			}
		}
	}
</style>
