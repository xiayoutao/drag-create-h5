import { defineComponent } from 'vue';
import PropTypes from 'editor/common/propTypes';
import { getListFirst } from 'editor/common/utils';

const objectFits = [
	{ label: '保持纵横比', value: 'contain' },
	{ label: '不保持纵横比', value: 'fill' },
	{ label: '覆盖', value: 'cover' },
	{ label: '保持原有宽高', value: 'none' },
];

export default defineComponent({
	name: 'x-image',
	extra: {
		type: 2,
		icon: 'image',
		title: '图片',
		defaultStyle: {
			width: 360,
			height: 240,
		},
	},
	props: {
		src: PropTypes.string({
			label: '图片路径',
			defaultValue: '',
			props: { type: 'textarea', rows: 5 },
		}),
		fit: PropTypes.select({
			label: '裁剪方式',
			defaultValue: getListFirst(objectFits, 'value'),
			options: objectFits,
		}),
	},
	setup(props) {
		return () => <el-image src={props.src} fit={props.fit}></el-image>;
	},
});
