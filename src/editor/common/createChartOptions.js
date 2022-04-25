/**
 * 生成ECharts配置
 * @author xiayoutao
 * @date 2021-03-01
 */

/**
 * 生成ECharts配置信息
 * @param {*} datas
 */
export function createEChartOpts(data) {
	return {
		color: data.color,
		textStyle: data.textStyle,
		legend: {
			...data.legend,
			data: data.type === 'pie' ? null : data.data,
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow',
			},
		},
		grid: data.grid || {
			left: '10%',
			right: '10%',
			containLabel: true,
		},
		xAxis: data.type === 'pie' ? null : data.xAxis,
		yAxis: data.type === 'pie' ? null : data.yAxis,
		series: data.series
			.filter(
				(item, index) =>
					['bar', 'line', 'curve'].includes(data.type) ||
					(data.type === 'pie' && index === 0),
			)
			.map((item, index) => {
				return {
					...item,
					type: data.type === 'curve' ? 'line' : data.type,
					symbol: data.symbol || 'circle',
					symbolSize: 10,
					smooth: typeof item.smooth === 'boolean' ? item.smooth : true,
					barWidth: 15,
					lineStyle: {
						width: 2,
						shadowColor: data.showLineShadow
							? data.color[index]
							: 'transparent',
						shadowOffsetX: 0,
						shadowOffsetY: 5,
						shadowBlur: 5,
					},
					areaStyle: {
						color: data.color[index],
						opacity: data.showAreaStyle ? 0.36 : 0,
					},
					itemStyle: {
						normal: {
							barBorderRadius: [20, 20, 0, 0],
						},
					},
					label:
						data.type === 'pie'
							? {
									show: false,
							  }
							: null,
					data:
						data.type === 'pie'
							? item.data.map((subitem, subindex) => {
									return {
										value: subitem,
										name: data.xAxis.data[subindex],
									};
							  })
							: item.data,
				};
			}),
	};
}
