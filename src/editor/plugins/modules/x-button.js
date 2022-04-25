import { defineComponent } from 'vue';
import PropTypes from 'editor/common/propTypes';

export default defineComponent({
	name: 'x-button',
	extra: {
		type: 1,
		icon: 'button',
		title: '按钮',
		defaultStyle: {
			width: 160,
		},
	},
	props: {
		text: PropTypes.string({ label: '按钮文字' }),
		bgColor: PropTypes.color({ label: '背景色', defaultValue: '#fff' }),
		fontSize: PropTypes.number({
			label: '字号',
			defaultValue: 14,
			props: { min: 12, max: 100 },
		}),
		color: PropTypes.color({ label: '文字颜色', defaultValue: '#606266' }),
	},
	setup(props, { attrs }) {
		function handleClick() {
			console.log(111);
			if (attrs.editorMode === 'edit') return;
			console.log(222);
		}

		return () => (
			<el-button
				style={{
					backgroundColor: props.bgColor,
					fontSize: props.fontSize + 'px',
					color: props.color,
				}}
				onClick={handleClick}
			>
				{props.text}
			</el-button>
		);
	},
});
