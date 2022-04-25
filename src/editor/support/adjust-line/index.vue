<template>
	<div
		class="adjust-line-wrapper adjust-line-wrapper-v"
		@mousedown="onMousedown"
	>
		<div class="adjust-line adjust-line-v"></div>
		<div class="adjust-button">
			<div class="indicator"></div>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		onMousedown(e) {
			let startX = e.clientX;
			let move = (moveEvent) => {
				moveEvent.preventDefault();
				moveEvent.stopPropagation();
				const offset = startX - moveEvent.clientX;
				this.$emit('lineMove', offset);
				startX -= offset;
			};

			let up = () => {
				document.removeEventListener('mousemove', move, true);
				document.removeEventListener('mouseup', up, true);
			};

			document.addEventListener('mousemove', move, true);
			document.addEventListener('mouseup', up, true);
		},
	},
};
</script>

<style lang="scss" scoped>
$activeHoverColor: $success;

.adjust-line-wrapper {
	&:hover {
		.adjust-button {
			background-color: $activeHoverColor;
		}

		.adjust-line {
			border-color: $activeHoverColor;
		}
	}

	.adjust-line {
		border: 1px solid #ccc;
	}

	.adjust-line-h {
		width: 100%;
	}

	.adjust-line-v {
		height: 100%;
	}

	.adjust-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 10px;
		margin: 0 auto;
		background-color: #ccc;

		.indicator {
			width: 10px;
			height: 1px;
			margin: 0 auto;
			background-color: #eee;
		}
	}
}

.adjust-line-wrapper-h {
	cursor: ns-resize;

	.adjust-tip {
		height: 24px;
		margin: 2px auto 0;
		padding: 0;
		color: #868484;
		font-size: 12px;
		line-height: 24px;
		letter-spacing: 1px;
		text-align: center;
		vertical-align: middle;
	}
}

.adjust-line-wrapper-v {
	position: relative;
	height: 100%;
	cursor: ew-resize;

	.adjust-button {
		position: absolute;
		top: 50%;
		right: -10px;
		transform: rotate(90deg);
	}
}
</style>
