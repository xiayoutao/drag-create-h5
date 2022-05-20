<template>
	<div class="chart scrollbar" v-loading="loading">
		<div class="chart-inner" :id="chartId"></div>
	</div>
</template>

<script>
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';

export default {
	name: 'common-chart',
	props: ['options', 'canvasWidth', 'canvasHeight'],
	setup(props, { emit }) {
		const loading = ref(false);
		const chartId = ref(
			'chart_' +
				new Date().getTime() +
				'_' +
				Math.floor(Math.random() * 10000000000),
		);
		const chartWidth = computed(() => props.canvasWidth);
		const chartHeight = computed(() => props.canvasHeight);
		let myChart = null;

		watch(
			() => props.options,
			(val) => {
				if (myChart && myChart.setOption) {
					myChart.setOption(val, true);
				}
			},
		);

		watch([() => props.canvasWidth, () => props.canvasHeight], () => {
			init(props.options);
		});

		onMounted(() => {
			nextTick(() => {
				init(props.options);
			});

			window.addEventListener('resize', () => {
				if (!myChart) return;
				myChart.resize();
			});
		});

		function init(options) {
			if (!options) {
				emit('error', '参数未传递');
				loading.value = false;
				return;
			}
			var dom = document.getElementById(chartId.value);
			// 基于准备好的dom，初始化echarts实例
			myChart = echarts.init(dom);
			// 绘制图表
			myChart.setOption(options, true);
			myChart.off('click');
			myChart.on('click', (params) => {
				emit('click', params);
			});
			dom.style.width = props.canvasWidth;
			dom.style.height = chartHeight.value;
			myChart.resize();
			loading.value = false;
			emit('loaded');
		}

		return {
			loading,
			chartId,
			chartWidth,
			chartHeight,
		};
	},
};
</script>

<style lang="scss" scoped>
.chart {
	position: relative;
	width: 100%;
	height: 100%;
	overflow-y: auto;

	&-inner {
		width: 100%;
		height: 100%;
	}
}
</style>
