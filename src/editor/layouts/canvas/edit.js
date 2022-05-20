import { defineComponent, h, ref } from 'vue';
import { pluginObj } from 'editor/plugins';
import useElement from 'editor/hooks/useElement';
import Shape from 'editor/support/shape';
import ContextMenu from 'editor/support/contextmenu';

export default defineComponent({
	name: 'canvas-edit',
	props: ['elements', 'handleClickElement', 'handleClickCanvas'],
	setup(props) {
		const {
			editingElement,
			elementManager,
			setEditingElement,
			setElementPosition,
			recordElementRect,
		} = useElement();
		const curDom = ref(null);
		const vLines = ref([]);
		const hLines = ref([]);
		const contextmenuPos = ref([]);

		const calcVHLine = (isPointMove) => {};
		const drawVLine = (newLeft) => {
			vLines.value = [{ left: newLeft }];
		};
		const drawHLine = (newTop) => {
			hLines.value = [{ top: newTop }];
		};
		const clearVLine = () => {
			vLines.value = [];
		};
		const clearHLine = () => {
			hLines.value = [];
		};
		// 在元素移动过程中，计算和生成辅助线
		const handleElementMove = (pos) => {
			setElementPosition(pos);
			calcVHLine(false);
		};
		const handlePointMove = (pos) => {
			setElementPosition(pos);
			calcVHLine(true);
		};
		const handleContextMenu = (event) => {
			contextmenuPos.value = [event.clientX, event.clientY];
		};
		const hideContextMenu = () => {
			contextmenuPos.value = [];
		};
		const handleClickCanvas = (event) => {
			if (!event.target.classList.contains('element-edit-canvas')) {
				setEditingElement();
			}
		};
		/**
		 * 更新作品高度
		 * @param {Number} height
		 */
		const updateWorkHeight = (height) => {
			console.log(height);
		};

		const renderElements = (elements) => {
			return (
				<div
					style={{ height: '100%', position: 'relative' }}
					onClick={(event) => {
						hideContextMenu();
						handleClickCanvas(event);
					}}
					onContextmenu={(event) => {
						event.preventDefault();
						event.stopPropagation();
					}}
				>
					{elements.map((element) => {
						if (element.name === 'x-background') {
							return h(pluginObj[element.name], {
								...element.getProps(),
							});
						}
						return (
							<Shape
								ref={(el) => (curDom.value = el)}
								class="cps-wrapper"
								style={element.getStyle({ position: 'absolute' })}
								element={element}
								active={editingElement.value === element}
								defaultPosition={element.commonStyle}
								resize={element.resize}
								handleMousedown={() => {
									hideContextMenu();
									setEditingElement(element);
								}}
								handlePointMove={(event) => {
									handlePointMove(event);
								}}
								handleElementMove={(event) => handleElementMove(event)}
								handleElementMouseUp={() => {
									clearHLine();
									clearVLine();
									recordElementRect();
								}}
								handlePointMouseUp={() => {
									clearHLine();
									clearVLine();
									recordElementRect();
								}}
								onDelete={() => elementManager({ type: 'delete' })}
								onContextmenu={handleContextMenu}
							>
								{h(pluginObj[element.name], {
									class: 'element-edit-canvas',
									style: {
										width: '100%',
										height: '100%',
									},
									...element.getProps(),
									editorMode: 'edit',
								})}
							</Shape>
						);
					})}
					{vLines.value.map((line) => (
						<div class="v-line" style={{ left: `${line.left}px` }}></div>
					))}
					{hLines.value.map((line) => (
						<div class="h-line" style={{ top: `${line.top}px` }}></div>
					))}
					{contextmenuPos.value.length > 0 ? (
						<ContextMenu
							position={contextmenuPos.value}
							onSelect={({ key }) => {
								elementManager({ type: key });
								hideContextMenu();
							}}
							onHideMenu={hideContextMenu}
						></ContextMenu>
					) : null}
				</div>
			);
		};

		return () => renderElements(props.elements);
	},
});
