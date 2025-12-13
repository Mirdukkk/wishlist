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
	<meta name="description" content="Мой вишлист с подарками на новый год" />
	<meta name="keywords" content="вишлист, wishlist, подарки, новый год, егор" />
	<meta name="author" content="Egor Mamykin" />
	<meta property="og:title" content="Мой вишлист — Егор Мамыкин" />
	<meta property="og:description" content="Мой вишлист с подарками на новый год" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="/images/og-image.png" />
	<meta property="og:url" content="https://wish.egor.me" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Мой вишлист — Егор Мамыкин" />
	<meta name="twitter:description" content="Мой вишлист с подарками на новый год" />
	<meta name="twitter:image" content="/images/og-image.png" />
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
		height: 100%;
		min-height: 100vh;
		padding-inline: 16px;

		&__background {
			position: absolute;
			inset: 0;
			overflow: hidden;
			width: 100%;
			height: 240px;
			mask-image: linear-gradient(black 50%, transparent);

			@media (max-width: 640px) {
				top: -20px;
			}
		}

		&__content {
			position: relative;
			z-index: 5;
			flex: 1;
			width: 100%;
			max-width: 1200px;
			margin-inline: auto;
			margin-block-start: 40px;

			@media (max-width: 640px) {
				margin-block-start: 20px;
			}
		}

		&__footer {
			width: 100%;
			max-width: 1200px;
			margin-inline: auto;
			margin-block-start: 56px;

			@media (max-width: 1024px) {
				margin-block-start: 28px;
			}
		}
	}
</style>
