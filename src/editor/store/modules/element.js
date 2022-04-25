import Element from 'editor/models/element';
import { pluginObj } from 'editor/plugins';

export default {
	state: {
		elements: [],
		editingElement: {}, // 当前正在编辑的组件
	},
	getters: {
		elements: (state) => state.elements,
		editingElement: (state) => state.editingElement,
	},
	mutations: {
		setEditingElement(state, payload) {
			state.editingElement = payload;
		},
		setElementCommonStyle(state, payload) {
			state.editingElement.commonStyle = {
				...state.editingElement.commonStyle,
				...payload,
			};
		},
		updateElement(state, payload) {
			let { elements, editingElement } = state;
			const index = elements.findIndex(
				(item) => item.uuid === editingElement.uuid,
			);
			if (index === -1) return;
			state.elements[index].pluginProps[payload.name] = payload.data;
		},
		elementManager(state, { type, value }) {
			let { elements, editingElement } = state;
			const len = elements.length;

			switch (type) {
				case 'add': // 新增
					{
						const vm = pluginObj[value.name];
						// 用于拖拽结束，确定最终放置的位置
						vm.dragStyle = value.dragStyle; // {left: Number, top: Number}
						vm.shortcutProps = value.shortcutProps;
						const element = new Element({
							...vm,
							// name: vm.name,
							icon: value.icon,
							title: value.title,
							// dragStyle: vm.dragStyle,
							// props: vm.props,
							// shortcutProps: vm.shortcutProps,
							// extra: vm.extra,
							zindex: len + 1,
							visible: value.visible,
							resize: vm.extra && vm.extra.resize, // 改变大小限制，x只允许改变宽度，y只允许改变高度，可以为空字符串（允许改变宽高）
						});
						state.elements.push(element);
					}
					break;
				case 'copy': // 复制
					state.elements.push(editingElement.clone({ zindex: len + 1 }));
					break;
				case 'delete': // 删除
					{
						const index = elements.findIndex(
							(item) => item.uuid === editingElement.uuid,
						);
						if (index !== -1) {
							elements.splice(index, 1);
						}
						state.editingElement = null;
					}
					break;
				case 'moveToTop': // 置于顶部
					{
						const index = elements.findIndex(
							(item) => item.uuid === editingElement.uuid,
						);
						elements.splice(index, 1);
						const newElements = [...elements, editingElement];
						newElements.forEach((ele, i) => {
							console.log('ele', ele);
							ele.commonStyle.zindex = i + 1;
						});
						console.log('newElements', newElements);
						state.elements = [...newElements];
						console.log('elements', elements);
					}
					break;
				case 'moveToBottom': // 置于底部
					{
						const index = elements.findIndex(
							(item) => item.uuid === editingElement.uuid,
						);
						elements.splice(index, 1);
						const newElements = [editingElement, ...elements];
						newElements.forEach((ele, i) => {
							ele.commonStyle.zindex = i + 1;
						});
						console.log('newElements', newElements.length);
						state.elements = [...newElements];
						console.log('elements', elements.length);
					}
					break;
				case 'moveUp': // 上一层
					{
						const maxZindex = elements.length;
						const eleZindex = editingElement.commonStyle.zindex;
						if (eleZindex === maxZindex) return;
						const index = elements.findIndex(
							(item) => item.uuid === editingElement.uuid,
						);
						elements[index] = elements.splice(index + 1, 1, elements[index])[0];
						elements.forEach((ele, i) => {
							ele.commonStyle.zindex = i + 1;
						});
					}
					break;
				case 'moveDown': // 下一层
					{
						const eleZindex = editingElement.commonStyle.zindex;
						if (eleZindex === 1) return;
						const index = elements.findIndex(
							(item) => item.uuid === editingElement.uuid,
						);
						elements[index] = elements.splice(index - 1, 1, elements[index])[0];
						elements.forEach((ele, i) => {
							ele.commonStyle.zindex = i + 1;
						});
					}
					break;
				default:
			}
		},
		recordRect(state, payload) {
			console.log(state, payload);
		},
	},
	actions: {
		setElementPosition({ commit }, payload) {
			commit('setElementCommonStyle', payload);
		},
		setElementShape({ commit }, payload) {
			commit('setElementCommonStyle', payload);
		},
		recordElementRect({ commit }, payload = {}) {
			commit('recordRect', payload);
		},
	},
};
