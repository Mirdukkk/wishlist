<script module lang="ts">
	export type Filter = 'all' | 'upTo500' | 'upTo1000' | 'upTo2000' | 'above2000'

	export interface FiltersProps {
		value: Filter
	}

	export interface FilterModel {
		label: string
		value: Filter
	}
</script>

<script lang="ts">
	let { value = $bindable() }: FiltersProps = $props()
	const filters: FilterModel[] = [
		{
			label: 'Все',
			value: 'all'
		},
		{
			label: 'До 500 ₽',
			value: 'upTo500'
		},
		{
			label: 'До 1000 ₽',
			value: 'upTo1000'
		},
		{
			label: 'До 2000 ₽',
			value: 'upTo2000'
		},
		{
			label: 'Выше 2000 ₽',
			value: 'above2000'
		}
	]
</script>

<div class="filters">
	{#each filters as filter}
		<button
			type="button"
			class="filters__item"
			role="tab"
			class:filters__item--selected={value === filter.value}
			aria-selected={value === filter.value}
			onclick={() => (value = filter.value)}
		>
			{filter.label}
		</button>
	{/each}
</div>

<style lang="scss">
	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		justify-content: center;

		@media (max-width: 640px) {
			gap: 10px;
		}

		&__item {
			padding: 8px 20px;
			border: 2px solid rgb(var(--color-subtle));
			border-radius: 32px;
			background: transparent;
			outline: none;
			font: 700 var(--font-body-md);
			cursor: pointer;
			transition:
				background-color var(--duration-default),
				color var(--duration-default),
				border-color var(--duration-default);

			@media (max-width: 640px) {
				padding: 6px 16px;
			}

			&:hover:not(.filters__item--selected),
			&:focus-visible:not(.filters__item--selected) {
				border-color: rgb(var(--color-content));
				background: rgb(var(--color-content) / 0.15);
			}

			&:active:not(.filters__item--selected) {
				border-color: rgb(var(--color-content));
				background: rgb(var(--color-content) / 0.2);
			}

			&--selected {
				border-color: transparent;
				background: rgb(var(--color-content));
				color: rgb(var(--color-background));
			}
		}
	}
</style>
