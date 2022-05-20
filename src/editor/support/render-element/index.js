import { computed, defineComponent } from 'vue';

// 渲染element 组件
export default defineComponent({
	name: 'render-element',
	props: ['component', 'data', 'props', 'options'],
	emits: ['change'],
	setup(props, { emit }) {
		const propsProps = computed(() => props.props);
		const component = computed(() => props.component);
		const propsData = computed({
			get: () => {
				if (props.data instanceof Object) {
					return JSON.parse(JSON.stringify(props.data));
				}
				return props.data;
			},
			set: () => {},
		});
		const options = computed(() => {
			if (props.options instanceof Array && props.options.length > 0) {
				return JSON.parse(JSON.stringify(props.options));
			}
			return [];
		});

		const renderInput = () => {
			return (
				<el-input
					v-model={propsData.value}
					{...propsProps.value}
					onInput={(val) => emit('change', val)}
				/>
			);
		};

		const renderInputNumber = () => {
			return (
				<el-input-number
					v-model={propsData.value}
					{...propsProps.value}
					onChange={(val) => emit('change', val)}
				/>
			);
		};

		const renderSelect = () => {
			return (
				<el-select
					v-model={propsData.value}
					{...propsProps.value}
					onChange={(val) => emit('change', val)}
				>
					{options.value.map((item) => {
						return <el-option {...item}></el-option>;
					})}
				</el-select>
			);
		};

		const renderSwitch = () => {
			return (
				<el-switch
					v-model={propsData.value}
					{...propsProps.value}
					onChange={(val) => emit('change', val)}
				/>
			);
		};

		const renderColorPicker = () => {
			return (
				<el-color-picker
					v-model={propsData.value}
					size="mini"
					onChange={(val) => emit('change', val)}
				/>
			);
		};

		return () => {
			if (component.value === 'input-number') {
				// 数字
				return renderInputNumber(propsData.value);
			} else if (component.value === 'select') {
				// 下拉框
				return renderSelect(propsData.value);
			} else if (component.value === 'switch') {
				// 开关
				return renderSwitch(propsData.value);
			} else if (component.value === 'color-picker') {
				// 颜色选择器
				return renderColorPicker(propsData.value);
			}
			return renderInput(propsData.value); // 默认输入框
		};
	},
});
