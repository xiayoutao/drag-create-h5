import { defineComponent } from 'vue';
import PropTypes from 'editor/common/propTypes';
import '../styles/x-textarea.scss';

export default defineComponent({
	name: 'x-textarea',
	extra: {
		type: 1,
		icon: 'textarea',
		title: '文本域',
		defaultStyle: {
			width: 260,
			height: 80,
		},
	},
	props: {
		placeholder: PropTypes.string({
			label: '提示信息',
			defaultValue: '提示信息',
		}),
		disabled: PropTypes.boolean({ label: '是否禁用', defaultValue: false }),
		fontSize: PropTypes.number({
			label: '字号',
			defaultValue: 14,
			props: { min: 12, max: 100 },
		}),
		color: PropTypes.color({ label: '文字颜色', defaultValue: '#606266' }),
	},
	setup(props) {
		return () => (
			<textarea
				class="x-textarea"
				disabled={props.disabled}
				readonly={true}
				placeholder={props.placeholder}
				style={{
					backgroundColor: props.bgColor,
					fontSize: props.fontSize + 'px',
					color: props.color,
				}}
			></textarea>
		);
	},
});
