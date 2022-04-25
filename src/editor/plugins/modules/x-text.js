import { defineComponent } from 'vue';
import PropTypes from 'editor/common/propTypes';

export default defineComponent({
	name: 'x-text',
	extra: {
		type: 1,
		icon: 'text',
		title: '文字',
		defaultStyle: {
			width: 260,
		},
	},
	props: {
		text: PropTypes.string({
			label: '文字',
			defaultValue: '请输入文字',
			props: { type: 'textarea', rows: 5 },
		}),
		fontSize: PropTypes.number({
			label: '字号',
			defaultValue: 14,
			props: { min: 12, max: 100 },
		}),
	},
	setup(props) {
		return () => <div style={{ fontSize: props.fontSize }}>{props.text}</div>;
	},
});
