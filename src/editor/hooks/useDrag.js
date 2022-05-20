import Drag from 'editor/common/drag';

/**
 * 组件拖拽至画布功能
 * @param {*} clone 复制dom方法
 */
export default function ({ top = 0, left = 0, clone }) {
	let dragDom = null;
	let dragConfig = {
		isPreDrag: false, // 准备拖拽
		isDrag: false, // 正式拖拽
		origin: {
			clientY: 0, // 鼠标按下时候时候值
			clientX: 0,
			layerX: 0, // 鼠标.x 相对于元素左上角.left 的偏移
			layerY: 0, // 鼠标.y 相对于元素左上角.top  的偏移
		},
	};
	let dragElement = null;

	function handleDragStart(element, event) {
		console.log('handleDragStart', event, event.target);
		// 0 为 左键点击
		if (event.button !== 0) return;
		if (dragDom) {
			document.body.removeChild(dragDom);
			dragDom = null;
		}
		dragElement = element;
		if (event.target.classList.contains('cps-button')) {
			dragDom = event.target.cloneNode(true);
		} else {
			dragDom = event.target.parentElement.cloneNode(true);
		}
		document.body.appendChild(dragDom);

		new Drag({
			mousedown,
			mousemove,
			mouseup,
		}).start(event);
	}
	function mousedown(event) {
		console.log('mousedown', event);
		// 鼠标.x 相对于元素左上角 的偏移
		const { layerX, layerY } = event;
		dragConfig.origin.layerX = layerX;
		dragConfig.origin.layerY = layerY;
		dragConfig.origin.clientX = event.clientX;
		dragConfig.origin.clientY = event.clientY;
		dragDom.style.position = 'absolute';
		dragDom.style.left = event.clientX + 'px';
		dragDom.style.top = event.clientY + 'px';
		dragDom.classList.add('dragging-dom-ele', 'hidden');
		dragConfig.isPreDrag = true;
	}
	// 组件拖拽中
	function mousemove(event) {
		event.preventDefault();
		dragDom.classList.remove('hidden');
		dragDom.style.left = event.clientX + 'px';
		dragDom.style.top = event.clientY + 'px';
	}
	function mouseup(event) {
		console.log('mouseup', event);
		document.body.removeChild(dragDom);
		dragDom = null;

		if (event.clientX < left || event.clientY < top) return;
		const canMousedown = checkCanMousedown(event, { minOffset: 10 });
		console.log('canMousedown', canMousedown);
		if (!canMousedown) return;

		const canvasWrapper = document.querySelector('.canvas-wrapper');
		console.log('canvasWrapper', canvasWrapper);
		const position = canvasWrapper.getBoundingClientRect();
		console.log('position', position);
		dragElement &&
			clone({
				...dragElement,
				dragStyle: {
					left: event.clientX - position.left,
					top: event.clientY - position.top,
				},
			});
	}
	function checkCanMousedown(event, { minOffsetX, minOffsetY, minOffset }) {
		const offsetX = event.clientX - dragConfig.origin.clientX;
		const offsetY = event.clientY - dragConfig.origin.clientY;
		return (
			offsetX >= (minOffsetX || minOffset) ||
			offsetY >= (minOffsetY || minOffset)
		);
	}

	return {
		handleDragStart,
		mousedown,
		mousemove,
		mouseup,
		checkCanMousedown,
	};
}
