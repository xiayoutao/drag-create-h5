export const storeKey = 'editor';

export const DESIGN_DRAFT_WIDTH = 375;
export const styleKey = 'commonStyle';

// 输入框类型
export const inputType = [
	{ label: '普通', value: 'text' },
	{ label: '密码框', value: 'password' },
	{ label: '数字', value: 'number' },
	{ label: '邮箱', value: 'email' },
	{ label: '手机号', value: 'tel' },
];

// 图表类型
export const chartType = [
	{ label: '柱状图', value: 'bar' },
	{ label: '饼状图', value: 'pie' },
	{ label: '折线图', value: 'line' },
	{ label: '曲线图', value: 'curve' },
];

// echarts配置项legend显示位置
export const legendShowType = [
	{ label: '顶部', value: 'top' },
	{ label: '左侧', value: 'left' },
	{ label: '右侧', value: 'right' },
	{ label: '底部', value: 'bottom' },
	{ label: '不显示', value: 'none' },
];

// 图表颜色
export const chartColors = [
	'#19d4ae',
	'#5ab1ef',
	'#fa6e86',
	'#ffb980',
	'#0067a6',
	'#c4b4e4',
	'#d87a80',
	'#9cbbff',
	'#d9d0c7',
	'#87a997',
	'#d49ea2',
	'#5b4947',
	'#7ba3a8',
];

// excel默认值
export const defaultExcelValue = [
	{ 季度: '第一季度', 销量: 19, 排名: 1 },
	{ 季度: '第二季度', 销量: 15, 排名: 6 },
	{ 季度: '第三季度', 销量: 31, 排名: 56 },
	{ 季度: '第四季度', 销量: 41, 排名: 36 },
];

// 组件类型
export const componentTypes = [
	{ label: '基础', value: 1, icon: 'component' },
	{ label: '媒体', value: 2, icon: 'media' },
	{ label: '图表', value: 3, icon: 'chart' },
	{ label: '艺术字', value: 4, icon: 'art' },
];

// 字体
export const fontFamilys = [{ label: '微软雅黑', value: 'Microsoft YaHei' }];

// 方向角度
export const angleList = [
	{ label: '上', value: 'top', data: [0, -1] },
	{ label: '右上', value: 'rightTop', data: [1, -1] },
	{ label: '右', value: 'right', data: [1, 0] },
	{ label: '右下', value: 'rightBottom', data: [1, 1] },
	{ label: '下', value: 'bottom', data: [0, 1] },
	{ label: '左下', value: 'leftBottom', data: [-1, 1] },
	{ label: '左', value: 'left', data: [-1, 0] },
	{ label: '左上', value: 'leftTop', data: [-1, -1] },
];

// 艺术字类型
export const artTypes = [
	{
		label: '阴影',
		value: 'shadow',
		styles: {
			overflowWrap: 'break-word',
			fontFamily: 'fangzheng_stjt',
			fontSize: '28px',
			cursor: 'default',
			minHeight: 'inherit',
			textShadow: 'rgb(161, 88, 179) 0px 0px 0.3em !important',
			letterSpacing: '0em',
		},
	},
	{
		label: '立体',
		value: 'solid',
		styles: {
			overflowWrap: 'break-word',
			fontFamily: 'TTENuoJ',
			fontSize: '26px',
			cursor: 'default',
			minHeight: 'inherit',
			textShadow:
				'rgb(255, 121, 162) 1px 1px 0px, rgb(255, 121, 162) 2px 2px 0px, rgb(255, 121, 162) 3px 3px 0px, rgb(159, 174, 199) 3px 4px 0.2em !important',
			letterSpacing: '0em',
		},
	},
	{ label: '描边', value: 'stroke' },
	{ label: '多重', value: 'multiple' },
	{ label: '贴图', value: 'chartlet' },
	{ label: '渐变', value: 'gradient' },
	{ label: '颤抖', value: 'tremble' },
	{ label: '镌刻', value: 'engrave' },
];
