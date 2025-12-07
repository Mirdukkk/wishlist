<script lang="ts">
	let { children } = $props()
</script>

<div class="grid">
	{@render children()}
</div>

<style lang="scss">
	.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 12px;

		@media (max-width: 1200px) {
			grid-template-columns: repeat(3, 1fr);
		}

		@media (max-width: 1024px) {
			grid-template-columns: repeat(2, 1fr);
		}

		@media (max-width: 640px) {
			grid-template-columns: 1fr;
		}
	}
</style>
