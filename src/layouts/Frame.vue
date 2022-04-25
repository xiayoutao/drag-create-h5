<template>
	<div class="app-frame">
		<div class="app-header">
			<div class="header-title">标题</div>
			<div class="header-menu">
				<div class="menu-item"></div>
				<div class="menu-item"></div>
				<div class="menu-item"></div>
				<div class="menu-item"></div>
			</div>
			<div class="header-right">
				<div class="menu-item"></div>
				<div class="menu-item"></div>
				<div class="menu-item"></div>
				<div class="menu-item"></div>
			</div>
		</div>
		<div class="app-main">
			<router-view />
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {},
};
</script>

<style lang="scss" scoped>
.app-frame {
	@include flex-column();
	position: relative;
	min-width: 1000px;
	height: 100%;

	.app-header {
		@include flex-row(center);
		height: 50px;
		background-color: #000;

		.menu-item {
			@include flex-row(center);
			width: 50px;
			height: 100%;
			background-repeat: no-repeat;
			background-position: center;
			background-size: 100%;
			cursor: pointer;
		}

		.header-menu,
		.header-title,
		.header-right {
			@include flex-row(center);
			height: 100%;
			padding: 0 20px;
			color: #fff;
			font-size: 16px;
		}
		.header-title {
			width: 300px;
		}

		.header-right {
			width: 300px;
		}

		.header-menu {
			flex: 1;
		}
	}

	.app-main {
		@include flex-row();
		height: calc(100% - 50px);
	}
}
</style>
