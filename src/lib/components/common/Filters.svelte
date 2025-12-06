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
	import { ToggleGroup } from 'bits-ui'

	let { value = $bindable() }: FiltersProps = $props()
	let filters: FilterModel[] = [
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

	const getValue = () => {
		return value
	}

	const setValue = (newValue: Filter) => {
		if (newValue) {
			value = newValue
		}
	}
</script>

<ToggleGroup.Root type="single" bind:value={getValue, setValue}>
	{#snippet child({ props })}
		<div class="filters" {...props}>
			{#each filters as filter}
				<ToggleGroup.Item value={filter.value}>
					{#snippet child({ props })}
						<button
							class={{ 'filters__item': true, 'filters__item--selected': value === filter.value }}
							type="button"
							{...props}
						>
							{filter.label}
						</button>
					{/snippet}
				</ToggleGroup.Item>
			{/each}
		</div>
	{/snippet}
</ToggleGroup.Root>

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
			background: rgb(var(--color-background));
			font: 700 var(--font-body-md);
			cursor: pointer;
			transition:
				background-color var(--duration-default),
				color var(--duration-default),
				border-color var(--duration-default);

			@media (max-width: 640px) {
				padding: 6px 16px;
			}

			&:hover:not(.filters__item--selected) {
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
