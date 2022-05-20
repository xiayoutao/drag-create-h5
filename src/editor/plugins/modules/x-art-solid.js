import { defineComponent } from 'vue';
import PropTypes from 'editor/common/propTypes';
import { getListFirst } from 'editor/common/utils';
import { fontFamilys, artTypes, angleList } from 'editor/common/constants';

import '../styles/x-art.scss';

export default defineComponent({
	name: 'x-art-solid',
	extra: {
		type: 4,
		icon: 'art',
		title: '立体',
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
		solid: PropTypes.form({
			label: '立体层次',
			defaultValue: [
				{ label: '尺寸', value: 'size', data: 3, component: 'input-number' },
				// { label: '水平偏移', value: 'offsetX', data: 0, component: 'input-number' },
				// { label: '垂直偏移', value: 'offsetY', data: 0, component: 'input-number' },
				{
					label: '角度',
					value: 'angle',
					data: 'rightBottom',
					component: 'select',
					options: angleList,
				},
				{ label: '颜色', value: 'color', data: '#409EFF', component: 'color' },
			],
		}),
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
		const getTextShadowStyle = (shadows = [], solids = []) => {
			let _solids = [];
			if (solids.length > 0) {
				let size = solids
					.filter((item) => item.value === 'size')
					.map((item) => item.data)[0];
				let color = solids
					.filter((item) => item.value === 'color')
					.map((item) => item.data)[0];
				let angle = solids
					.filter((item) => item.value === 'angle')
					.map((item) => item.data)[0];
				_solids = new Array(size).fill('').map((item, index) => {
					return `${color} ${angleList
						.filter((item) => item.value === angle)[0]
						.data.map((subitem) => `${subitem * (index + 1)}px`)
						.join(' ')} 0`;
				});
			}

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
			if (_solids.length > 0) {
				return _solids.join(',') + ',' + _shadows.join(' ');
			} else {
				return _shadows.join(' ');
			}
		};
		return () => (
			<div
				class="art-text"
				style={{
					fontFamily: props.fontFamily,
					fontSize: props.fontSize + 'px',
					color: props.color,
					textShadow: getTextShadowStyle(props.textShadow, props.solid),
				}}
			>
				{props.text}
			</div>
		);
	},
});
