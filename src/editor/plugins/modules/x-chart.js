import { computed, defineComponent } from 'vue';
import PropTypes from 'editor/common/propTypes';
import { createEChartOpts } from 'editor/common/createChartOptions';
import CommonChart from 'editor/components/common-chart';
import { getListFirst } from 'editor/common/utils';
import {
	chartType,
	legendShowType,
	chartColors,
	defaultExcelValue,
} from 'editor/common/constants';

export default defineComponent({
	name: 'x-chart',
	extra: {
		type: 3,
		icon: 'chart',
		title: '图表',
		defaultStyle: {
			width: 500,
			height: 360,
		},
	},
	props: {
		type: PropTypes.select({
			label: '图表类型',
			defaultValue: getListFirst(chartType, 'value'),
			options: chartType,
		}),
		title: PropTypes.string({ label: '标题', defaultValue: '数据统计' }),
		color: PropTypes.color({ label: '文字颜色', defaultValue: '#666' }),
		legend: PropTypes.select({
			label: '图例设置',
			defaultValue: getListFirst(legendShowType, 'value'),
			options: legendShowType,
		}),
		chartColors: PropTypes.color({
			type: Array,
			label: '图表颜色',
			defaultValue: [...chartColors],
			layout: 'labelBlock',
		}),
		showLineShadow: PropTypes.boolean({
			label: '折线阴影',
			defaultValue: false,
		}),
		showAreaStyle: PropTypes.boolean({
			label: '填充颜色',
			defaultValue: false,
		}),
		excel: PropTypes.excel({
			label: '数据',
			desc: '请上传数据',
			question: '请问',
			defaultValue: defaultExcelValue.map((item) => {
				return { ...item };
			}),
		}),
	},
	setup(props) {
		console.log('props.type', props.type);
		const dataList = computed(() => props.excel);
		let filterKey = '';
		const xAxisKey = computed(() => {
			return dataList.value.map((item) => {
				Object.keys(item).map((key) => {
					if (isNaN(item[key] - 0)) {
						filterKey = key;
					}
				});
				return item[filterKey];
			});
		});
		const yAxisKey = computed(() => {
			return dataList.value.length > 0
				? Object.keys(dataList.value[0]).filter((item) => item !== filterKey)
				: [];
		});
		console.log('xAxisKey', xAxisKey.value);
		console.log('yAxisKey', yAxisKey.value);
		const chartOptions = computed(() => {
			let _legend = {
				show: props.legend !== 'none',
				data: yAxisKey.value,
			};
			if (props.legend === 'top') {
				_legend.orient = 'horizontal';
				_legend.top = 0;
				_legend.left = 'center';
			} else if (props.legend === 'bottom') {
				_legend.orient = 'horizontal';
				_legend.left = 'center';
				_legend.bottom = 0;
			} else if (props.legend === 'left') {
				_legend.orient = 'vertical';
				_legend.top = 'middle';
				_legend.left = 0;
			} else if (props.legend === 'right') {
				_legend.orient = 'vertical';
				_legend.top = 'middle';
				_legend.right = 0;
			}
			const datas = {
				type: props.type,
				color: props.chartColors,
				textStyle: {
					color: props.color,
				},
				legend: _legend,
				grid: {
					top: `${props.legend === 'top' ? 20 : 5}%`,
					left: `${props.legend === 'left' ? 20 : 5}%`,
					right: `${props.legend === 'right' ? 20 : 5}%`,
					bottom: `${props.legend === 'bottom' ? 20 : 5}%`,
					containLabel: true,
				},
				xAxis: {
					type: 'category',
					boundaryGap: props.type === 'bar',
					data: xAxisKey.value,
				},
				yAxis: {
					type: 'value',
				},
				series: yAxisKey.value.map((item) => {
					return {
						name: item,
						smooth: props.type === 'curve',
						data: dataList.value.map((subitem) => subitem[item]),
					};
				}),
				showLineShadow: props.showLineShadow,
				showAreaStyle: props.showAreaStyle,
			};
			return createEChartOpts(datas);
		});
		console.log('chartOptions', chartOptions.value);
		return () => (
			<CommonChart
				canvasWidth="100%"
				canvasHeight="100%"
				options={chartOptions.value}
			></CommonChart>
		);
	},
});
