<script lang="ts">
	import Section from '$lib/components/layout/Section.svelte'
	import Text from '$lib/components/typography/Text.svelte'
	import Filters, { type Filter } from '$lib/components/common/Filters.svelte'

	let filter: Filter = $state('all')
</script>

<Section name="hero">
	<div class="hero__container">
		<div class="hero__top">
			<img class="hero__image" src="https://placehold.co/64" alt="Я" width="64" height="64" />
			<Text class="hero__name" as="p" weight="bold" alignment="center">Егор</Text>
		</div>
		<div class="hero__title">
			<Text as="h1" variant="display" alignment="center">Мой вишлист</Text>
		</div>
		<div class="hero__filters">
			<Filters bind:value={filter} />
			{filter}
		</div>
	</div>
</Section>

<style lang="scss">
	.hero {
		&__top {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 48px;

			@media (max-width: 640px) {
				margin-bottom: 36px;
			}
		}

		&__image {
			width: 64px;
			height: 64px;
			margin-bottom: 16px;
			border-radius: 50%;
		}

		&__title {
			margin-bottom: 48px;

			@media (max-width: 640px) {
				margin-bottom: 36px;
			}
		}
	}
</style>
