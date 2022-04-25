import { defineComponent } from 'vue';
import PropTypes from 'editor/common/propTypes';
import { getListFirst } from 'editor/common/utils';
import { fontFamilys, artTypes } from 'editor/common/constants';

import '../styles/x-art.scss';

export default defineComponent({
	name: 'x-art-shadow',
	extra: {
		type: 4,
		icon: 'art',
		title: '阴影',
		defaultStyle: {
			width: 320,
			height: 45,
		},
	},
	props: {
		text: PropTypes.string({
			label: '文字',
			defaultValue: '艺术字',
			props: { type: 'textarea', rows: 2 },
		}),
		type: PropTypes.select({
			label: '类型',
			defaultValue: getListFirst(artTypes, 'value'),
			options: artTypes,
		}),
		fontFamily: PropTypes.select({
			label: '字体',
			defaultValue: getListFirst(fontFamilys, 'value'),
			options: fontFamilys,
		}),
		fontSize: PropTypes.number({
			label: '字号',
			defaultValue: 30,
			props: { min: 24, max: 100 },
		}),
		color: PropTypes.color({ label: '文字颜色', defaultValue: '#fff' }),
		textShadow: PropTypes.form({
			label: '文字阴影',
			defaultValue: [
				{
					label: '水平偏移',
					value: 'offsetX',
					data: 0,
					component: 'input-number',
				},
				{
					label: '垂直偏移',
					value: 'offsetY',
					data: 0,
					component: 'input-number',
				},
				{
					label: '模糊',
					value: 'blur',
					data: 0.2,
					component: 'input-number',
					props: { step: 0.1, min: 0, max: 1 },
				},
				{ label: '颜色', value: 'color', data: '#E64340', component: 'color' },
			],
		}),
	},
	setup(props) {
		const getTextShadowStyle = (shadows = []) => {
			let _shadows = new Array(4).fill('');
			shadows.map((item) => {
				if (item.value === 'color') {
					_shadows[0] = item.data;
				} else if (item.value === 'offsetX') {
					_shadows[1] = item.data + 'px';
				} else if (item.value === 'offsetY') {
					_shadows[2] = item.data + 'px';
				} else if (item.value === 'blur') {
					_shadows[3] = item.data + 'em';
				}
			});
			_shadows.push('!important');
			return _shadows.join(' ');
		};

		return () => (
			<div
				class="art-text"
				style={{
					fontFamily: props.fontFamily,
					fontSize: props.fontSize + 'px',
					color: props.color,
					textShadow: getTextShadowStyle(props.textShadow),
				}}
			>
				{props.text}
			</div>
		);
	},
});
