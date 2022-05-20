import { ref } from 'vue';
import EditorProps from './editorProps';
import EditorAnimation from './editorAnimation';
import { ElMessage } from 'element-plus';
import useElement from 'editor/hooks/useElement';

export default {
	name: 'right-editor',
	setup() {
		const { editingElement } = useElement();
		const currentTab = ref('props');

		function handleChangeTab(tab) {
			if (editingElement.value || tab === 'page') {
				currentTab.value = tab;
			} else {
				ElMessage({ type: 'error', message: '你还没有选择要编辑的组件' });
			}
		}

		return () => (
			<div class="right-editor">
				<div class="tabs-wrap">
					<div
						class="tab-item"
						class={{ active: currentTab.value === 'props' }}
						onClick={() => handleChangeTab('props')}
					>
						属性
					</div>
					<div
						class="tab-item"
						class={{ active: currentTab.value === 'animation' }}
						onClick={() => handleChangeTab('animation')}
					>
						动画
					</div>
					<div
						class="tab-item"
						class={{ active: currentTab.value === 'page' }}
						onClick={() => handleChangeTab('page')}
					>
						页面设置
					</div>
				</div>
				{currentTab.value === 'props' ? (
					<div class="tabs-con">
						<EditorProps />
					</div>
				) : null}
				{currentTab.value === 'animation' ? (
					<div class="tabs-con" style="padding: 0">
						<EditorAnimation />
					</div>
				) : null}
				{currentTab.value === 'page' ? (
					<div class="tabs-con" style="padding: 0">
						页面
					</div>
				) : null}
			</div>
		);
	},
};
