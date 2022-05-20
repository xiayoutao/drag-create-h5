import { ref } from 'vue';
import { pluginList } from 'editor/plugins';
import useDrag from 'editor/hooks/useDrag';
import useElement from 'editor/hooks/useElement';
import useLayout from 'editor/hooks/useLayout';
import { componentTypes } from 'editor/common/constants';

import '../styles/left.scss';

export default {
	name: 'layout-left',
	setup() {
		const { leftPanelWidth, rightPanelWidth } = useLayout();
		const { elementManager } = useElement();
		const { handleDragStart } = useDrag({
			top: 0,
			left: leftPanelWidth.value,
			right: rightPanelWidth.value,
			bottom: 0,
			clone: (data) => {
				elementManager({
					type: 'add',
					value: data,
				});
			},
		});
		const showType = ref(1); // 显示的组件类型

		return () => (
			<div
				class="xia-editor-left"
				style={{ width: `${leftPanelWidth.value}px` }}
			>
				<div class="cps-types">
					{componentTypes.map((item) => {
						return (
							<div
								class={[
									'cps-type-item',
									`${item.value === showType.value ? 'active' : ''}`,
								]}
								onClick={() => (showType.value = item.value)}
							>
								<span
									class={['type-icon', 'iconfont', `icon-${item.icon}`]}
								></span>
								<span class="type-label">{item.label}</span>
							</div>
						);
					})}
				</div>
				<div class="cps-wrap">
					{pluginList.map((item) => {
						return item.visible && showType.value === item.showType ? (
							<div class="cps-item">
								<div
									class="cps-button"
									onMousedown={(event) => {
										event.stopImmediatePropagation();
										handleDragStart(item, event);
									}}
								>
									<span
										class={['cps-button-icon', 'iconfont', `icon-${item.icon}`]}
									></span>
									<span class="cps-button-text">{item.title}</span>
								</div>
							</div>
						) : null;
					})}
				</div>
			</div>
		);
	},
};
