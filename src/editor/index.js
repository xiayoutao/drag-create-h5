/**
 * 编辑器组件入口
 */

import { defineComponent } from 'vue';
import editorStore from 'editor/store';
import { storeKey } from 'editor/common/constants';
import { pluginList } from 'editor/plugins';
import EditorLeft from 'editor/layouts/left';
import EditorRight from 'editor/layouts/right';
import EditorCanvas from 'editor/layouts/canvas';
import AdjustLine from 'editor/support/adjust-line';
import useLayout from 'editor/hooks/useLayout';
import useElement from 'editor/hooks/useElement';

import './styles/editor.scss';

const XiaEditor = defineComponent({
	name: 'xia-editor',
	props: ['id', 'getElements'],
	setup(props) {
		const { rightPanelWidth, setRightPanelWidth } = useLayout();
		const { elements, setEditingElement } = useElement();
		setEditingElement(null);

		const handleLineMove = (offset) => {
			// if (panelWidth >= 500 && offset > 0) return;
			if (rightPanelWidth.value <= 200 && offset < 0) return;
			setRightPanelWidth(rightPanelWidth.value + offset);
		};

		return () => (
			<div class="xia-editor" id={props.id}>
				<EditorLeft></EditorLeft>
				<EditorCanvas elements={elements.value}></EditorCanvas>
				<AdjustLine onLineMove={handleLineMove}></AdjustLine>
				<EditorRight panelWidth={rightPanelWidth.value}></EditorRight>
			</div>
		);
	},
});

const defaultInstallOpt = {};

XiaEditor.version = '0.0.1';

XiaEditor.install = (app, options) => {
	const option = Object.assign(defaultInstallOpt, options);
	app.config.globalProperties.$XiaEditor = option;
	app.component(XiaEditor.name, XiaEditor);
	pluginList.forEach((plugin) => {
		app.component(plugin.name, plugin.component);
	});
};

export const key = storeKey;
export const store = editorStore;

export default XiaEditor;
