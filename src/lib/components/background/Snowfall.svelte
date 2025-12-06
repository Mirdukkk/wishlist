<div class="snowfall">
	<img
		class="snowfall-part snowfall-part-1"
		alt=""
		draggable="false"
		aria-hidden="true"
		src="/images/background/snowfall-1.svg"
	/>
	<img
		class="snowfall-part snowfall-part-2"
		alt=""
		draggable="false"
		aria-hidden="true"
		src="/images/background/snowfall-2.svg"
	/>
	<img
		class="snowfall-part snowfall-part-3"
		alt=""
		draggable="false"
		aria-hidden="true"
		src="/images/background/snowfall-3.svg"
	/>
</div>

<style lang="scss">
	.snowfall {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);

		&-part {
			position: absolute;
			inset: 0;
			left: 50%;
			pointer-events: none;
			user-select: none;
			transform: translateX(-50%);
			animation: animation-snowfall linear infinite;

      &-1 {
        animation-duration: 20s;
      }

      &-2 {
        animation-duration: 30s;
      }

      &-3 {
        animation-duration: 40s;
      }
		}
	}

	@keyframes animation-snowfall {
		0% {
			transform: translateX(-50%) translateY(-100%);
		}

		100% {
			transform: translateX(-50%) translateY(100%);
		}
	}
</style>
