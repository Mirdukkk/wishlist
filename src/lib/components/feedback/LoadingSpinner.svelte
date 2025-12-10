<script lang="ts">
	import IconLoading from '$lib/components/graphics/IconLoading.svelte'
</script>

<div class="loading-spinner">
	<div class="loading-spinner__icon">
		<IconLoading />
	</div>
</div>

<style lang="scss">
	.loading-spinner {
		&__icon {
			width: 20px;
			height: 20px;
			animation: animation-spin 1.3s linear infinite;
		}
	}

	@keyframes animation-spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
