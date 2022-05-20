export default {
	required: {
		type: Boolean,
		default: false,
	},
	vertical: {
		type: Boolean,
		default: false,
	},
	boolean: ({
		label = '开关',
		desc = '',
		question = '',
		defaultValue = false,
		props = {},
		visible = true,
	} = {}) => ({
		type: Boolean,
		default: defaultValue,
		visible,
		editor: {
			component: 'switch',
			label,
			desc,
			question,
			props: {
				size: 'mini',
				...props,
			},
		},
	}),
	/**
	 * 颜色 默认编辑器
	 */
	color: ({
		type = String,
		label = '文字颜色',
		desc = '',
		question = '',
		defaultValue = '#000000',
		layout = '',
		visible = true,
	} = {}) => ({
		type,
		default: defaultValue,
		visible,
		editor: {
			component: 'color-picker',
			label,
			desc,
			question,
			// 为编辑组件指定 props
			props: {
				size: 'mini',
				showAlpha: true,
			},
			layout,
			require: true,
		},
	}),
	/**
	 * 数值类型 默认编辑器
	 */
	number: ({
		label = '数值',
		desc = '',
		question = '',
		defaultValue = 10,
		props = {},
		visible = true,
	} = {}) => ({
		type: Number,
		default: defaultValue,
		visible,
		editor: {
			component: 'input-number',
			label,
			desc,
			question,
			require: true,
			props: {
				size: 'mini',
				...props,
			},
		},
	}),
	/**
	 * 文本类型 默认编辑器
	 * component 可以采用
	 * 1. input
	 * 2. textarea
	 * 3. rich
	 */
	string: ({
		label = '按钮文字',
		desc = '',
		question = '',
		defaultValue = '按钮',
		component = 'input',
		props = {},
		visible = true,
	} = {}) => ({
		type: String,
		default: defaultValue,
		visible,
		editor: {
			require: true,
			component,
			label,
			desc,
			question,
			props: {
				size: 'mini',
				...props,
			},
		},
	}),
	select: ({
		valueType = String,
		label = '选项',
		desc = '',
		question = '',
		defaultValue = [],
		visible = true,
		options = [],
	} = {}) => ({
		type: valueType,
		default: defaultValue,
		visible,
		editor: {
			component: 'select',
			label,
			desc,
			question,
			options,
			props: {
				size: 'mini',
			},
		},
	}),
	form: ({
		label = '表单',
		desc = '',
		question = '',
		defaultValue = [],
		visible = true,
	} = {}) => ({
		type: Array,
		default: defaultValue,
		visible,
		editor: {
			component: 'form',
			label,
			desc,
			question,
			layout: 'labelBlock',
			require: true,
		},
	}),
	position: ({
		label = '坐标',
		desc = '',
		question = '',
		defaultValue = [0, 0],
		visible = true,
	} = {}) => ({
		type: Array,
		default: defaultValue,
		visible,
		editor: {
			component: 'position',
			label,
			desc,
			question,
			require: true,
		},
	}),
	textAlign: ({
		label = '文字对齐',
		desc = '',
		question = '',
		defaultValue = 'center',
		visible = true,
	} = {}) => ({
		type: String,
		default: defaultValue,
		visible,
		editor: {
			component: 'text-align',
			label,
			desc,
			question,
			require: true,
		},
	}),
	textOptions: ({
		label = '选项列表',
		desc = '',
		question = '',
		defaultValue = () => [
			{
				label: 'label1',
				value: 'value1',
			},
		],
		visible = true,
	} = {}) => ({
		type: Array,
		default: defaultValue,
		visible,
		editor: {
			component: 'props-text-enum-editor',
			label,
			desc,
			question,
			require: true,
		},
	}),
	image: ({
		label = '图片',
		desc = '',
		question = '',
		defaultValue = '',
		visible = true,
	} = {}) => ({
		type: String,
		default: defaultValue,
		visible,
		editor: {
			component: 'image-gallery',
			label,
			desc,
			question,
		},
	}),
	/**
	 * 数据源组件
	 */
	excel: ({
		label = '数据源',
		desc = '',
		question = '',
		defaultValue = [],
		layout = 'labelBlock',
		visible = true,
	} = {}) => ({
		type: Array,
		default: defaultValue,
		visible,
		editor: {
			component: 'excel-editor',
			label,
			desc,
			question,
			layout,
		},
	}),
};
