import { computed, defineComponent } from 'vue';
import EditorPropsFormItem from './editorPropsFormItem';
import useElement from 'editor/hooks/useElement';

export default defineComponent({
	name: 'editor-props',
	setup() {
		const { editingElement } = useElement();
		const currentProps = computed(() =>
			editingElement.value ? editingElement.value.props : {},
		);
		const pluginProps = computed(() =>
			editingElement.value ? editingElement.value.pluginProps : {},
		);
		const propsDataList = computed(() => {
			return Object.keys(currentProps.value).map((item) => {
				const data = currentProps.value[item];
				return {
					...data.editor,
					name: item,
					type: data.type,
					default: data.default,
					visible: data.visible,
					data: pluginProps.value[item],
				};
			});
		});

		return () => (
			<div class="props-wrapper">
				{editingElement.value &&
					propsDataList.value.map((item) => {
						return (
							<div
								class={[
									'props-item',
									item.layout === 'labelBlock' ? 'flex-column' : '',
								]}
							>
								<div class="props-label">
									<span class="label">{item.label}</span>
									{item.question && (
										<el-tooltip
											effect="dark"
											content={item.question}
											placement="top-start"
										>
											<div class="question"></div>
										</el-tooltip>
									)}
									{item.desc && <span class="desc">{item.desc}</span>}
								</div>
								<div class="props-data">
									<EditorPropsFormItem data={item} />
								</div>
							</div>
						);
					})}
			</div>
		);
	},
});
