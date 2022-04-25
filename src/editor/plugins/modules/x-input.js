import PropTypes from 'editor/common/propTypes';
import { defineComponent } from 'vue';
import { getListFirst } from 'editor/common/utils';
import { inputType } from 'editor/common/constants';

import '../styles/x-input.scss';

export default defineComponent({
	name: 'x-input',
	extra: {
		type: 1,
		icon: 'input',
		title: '输入框',
		defaultStyle: {
			width: 260,
		},
		resize: 'x',
	},
	props: {
		type: PropTypes.select({
			label: '类型',
			defaultValue: getListFirst(inputType, 'value'),
			options: inputType,
		}),
		placeholder: PropTypes.string({
			label: '提示信息',
			defaultValue: '提示信息',
		}),
		disabled: PropTypes.boolean({ label: '是否禁用', defaultValue: false }),
		bgColor: PropTypes.color({ label: '背景色', defaultValue: 'transparent' }),
		fontSize: PropTypes.number({
			label: '字号',
			defaultValue: 14,
			props: { min: 12, max: 100 },
		}),
		color: PropTypes.color({ label: '文字颜色', defaultValue: '#606266' }),
	},
	setup(props) {
		return () => (
			<input
				class="x-input"
				type={props.type}
				disabled={props.disabled}
				readonly={true}
				placeholder={props.placeholder}
				style={{
					backgroundColor: props.bgColor,
					fontSize: props.fontSize + 'px',
					color: props.color,
				}}
			></input>
		);
	},
});
