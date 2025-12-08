<script lang="ts">
	import '../styles/global.scss'
	import favicon from '$lib/assets/favicon.png'

	import Garland from '$lib/components/background/Garland.svelte'
	import Snowfall from '$lib/components/background/Snowfall.svelte'
	import Footer from '$lib/components/layout/Footer.svelte'

	let { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Мой вишлист — Егор Мамыкин</title>
</svelte:head>

<div class="layout">
	<div class="layout__background">
		<Garland />
		<Snowfall />
	</div>
	<div class="layout__content">
		{@render children()}
	</div>
	<div class="layout__footer">
		<Footer />
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
			mask-image: linear-gradient(black 50%, transparent);
		}

		&__content {
			position: relative;
			z-index: 5;
			flex: 1;
			margin-block-start: 40px;

			@media (max-width: 640px) {
				margin-block-start: 20px;
			}
		}

		&__footer {
			margin-block-start: 56px;

			@media (max-width: 1024px) {
				margin-block-start: 28px;
			}
		}
	}
</style>
