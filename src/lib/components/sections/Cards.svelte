<script lang="ts">
	import Section from '$lib/components/layout/Section.svelte'
	import Grid from '$lib/components/layout/Grid.svelte'
	import Card from '$lib/components/common/Card.svelte'
</script>

<Section name="cards">
	<Grid>
		<Card
			name="Киндер Буено"
			image="https://placehold.co/192"
			caption="Вкусни шоколадка"
			price={200}
			flipped
		/>
		<Card
			name="Киндер Буено"
			image="https://placehold.co/192"
			caption="Вкусни шоколадка"
			price={1000}
		/>
		<Card
			name="Киндер Буено"
			image="https://placehold.co/192"
			caption="Вкусни шоколадка"
			price={2000}
		/>
		<Card
			name="Киндер Буено"
			image="https://placehold.co/192"
			caption="Вкусни шоколадка"
			price={3000}
		/>
	</Grid>
</Section>
