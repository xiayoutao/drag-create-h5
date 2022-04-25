import { parsePx } from 'editor/common/element';
import { getUUID } from 'editor/common/utils';

// 编辑状态，不可以点击的按钮，因为点击按钮会触发一些默认行为，比如表单提交等
// const disabledPluginsForEditMode = ['x-input', 'x-button', 'x-video'];
const cloneObj = (value) => JSON.parse(JSON.stringify(value));

const defaultStyle = {
	top: 100,
	left: 100,
	zindex: 1,
	width: 100,
	height: 40,
	backgroundColor: 'rgba(255, 255, 255, 0)',
	textAlign: 'left',
	fontSize: 14,
	color: '#000000',
};

export default class Element {
	constructor(ele) {
		this.name = ele.name;
		this.uuid = ele.uuid || getUUID();
		this.resize = ele.resize || ''; // 默认可改变宽高，x宽度，y高度，none不能改变大小
		this.props = ele.props; // 属性
		this.pluginProps = this.getPluginProps(ele); // 数据
		this.commonStyle = this.getCommonStyle(ele); // 样式
		this.animations = ele.animations || []; // 动画
		this.events = ele.events || []; // 事件
	}

	getCommonStyle(ele) {
		if (typeof ele.commonStyle === 'object') {
			return cloneObj(ele.commonStyle);
		}
		return {
			...defaultStyle,
			zindex: ele.zindex,
			...(ele.extra && ele.extra.defaultStyle),
			...ele.dragStyle, // 拖拽结束落点的top、left
		};
	}

	getPluginProps(ele) {
		if (typeof ele.pluginProps === 'object') {
			return cloneObj({
				...ele,
				...ele.pluginProps,
				// uuid: this.uuid,
			});
		}
		return this.getDefaultPluginProps(ele);
	}

	getDefaultPluginProps(ele) {
		const { props = {}, shortcutProps = {} } = ele;

		let pluginProps = {
			// uuid: this.uuid
		};
		Object.keys(props).forEach((key) => {
			const defaultValue = props[key].default;
			pluginProps[key] =
				typeof defaultValue === 'function' ? defaultValue() : defaultValue;
		});

		pluginProps = {
			...pluginProps,
			...shortcutProps,
		};

		return pluginProps;
	}

	getStyle({ position = 'static', isRem = false } = {}) {
		if (this.name === 'x-background') {
			return {
				width: '100%',
				height: '100%',
			};
		}
		const pluginProps = this.pluginProps;
		const commonStyle = this.commonStyle;
		let style = {
			position,
			top: parsePx(pluginProps.top || commonStyle.top, isRem),
			left: parsePx(pluginProps.left || commonStyle.left, isRem),
			zIndex: commonStyle.zindex,
			width: parsePx(pluginProps.width || commonStyle.width, isRem),
			height: parsePx(pluginProps.height || commonStyle.height, isRem),
			fontSize: parsePx(pluginProps.fontSize || commonStyle.fontSize, isRem),
			color: pluginProps.color || commonStyle.color,
			// backgroundColor: pluginProps.backgroundColor || commonStyle.backgroundColor,
			textAlign: pluginProps.textAlign || commonStyle.textAlign,
		};
		return style;
	}

	getProps({ mode = 'edit' } = {}) {
		return {
			...this.pluginProps,
			editorMode: mode,
			// disabled: disabledPluginsForEditMode.includes(this.name) && mode === 'edit'
		};
	}

	getClass() {}

	getData() {}

	getAttrs() {
		const attrs = {
			'data-uuid': this.uuid,
		};

		if (this.animations.length > 0) {
			const animation = this.animations[0];
			attrs['data-swiper-animation'] = animation.type; // "fadeIn"
			attrs['data-duration'] = `${animation.duration}s`; // ".5s"
			attrs['data-delay'] = `${animation.delay}s`; // "1s"
		}
		return attrs;
	}

	clone({ zindex = this.commonStyle.zindex + 1 } = {}) {
		return new Element({
			zindex,
			name: this.name,
			props: this.props,
			pluginProps: this.pluginProps,
			commonStyle: {
				...this.commonStyle,
				top: this.commonStyle.top + 20,
				left: this.commonStyle.left + 20,
			},
		});
	}
}
