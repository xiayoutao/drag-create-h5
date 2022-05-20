const sorts = [
	'x-background',
	'x-chart',
	'x-art',
	'x-text',
	'x-button',
	'x-input',
	'x-textarea',
	'x-image',
	'x-swiper',
	'x-audio',
	'x-video',
	'x-map',
]; // 组件显示顺序

let sortObj = {};
sorts.forEach((item, index) => {
	sortObj[item] = index + 1;
});

const modulesFiles = require.context('./modules', true, /\.js$/);

export const pluginObj = modulesFiles.keys().reduce((modules, modulePath) => {
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
	const value = modulesFiles(modulePath);
	modules[moduleName] = value.default;
	return modules;
}, {});

export const pluginList = Object.keys(pluginObj)
	.map((item) => {
		const data = pluginObj[item];
		const extra = data.extra;
		return {
			visible: typeof extra.visible !== 'boolean' || !!extra.visible,
			title: extra.title,
			icon: extra.icon,
			component: data,
			name: item,
			sort: sortObj[item],
			showType: extra.type,
		};
	})
	.sort((pre, next) => pre.sort - next.sort);
