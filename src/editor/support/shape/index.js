import { ref, computed } from 'vue';
import './shape.scss';

export default {
	props: [
		'active',
		'element',
		'defaultPosition',
		'handleMousedown',
		'handleElementMove',
		'handlePointMove',
		'handleElementMouseUp',
		'handlePointMouseUp',
		'resize',
	],
	emits: ['delete'],
	setup(props, { slots, emit }) {
		const directionKey = ref({
			t: 'n',
			b: 's',
			l: 'w',
			r: 'e',
		});
		const active = computed(() => props.active);
		const position = computed(() => props.defaultPosition);

		let points = ['lt', 'rt', 'lb', 'rb', 'l', 'r', 't', 'b'];
		if (props.resize === 'x') {
			points = ['l', 'r'];
		} else if (props.resize === 'y') {
			points = ['t', 'b'];
		} else if (props.resize === 'none') {
			points = [];
		}

		/**
		 * 通过方位计算样式，主要是 top、left、鼠标样式
		 */
		const getPointStyle = (point, isWrapElement = true) => {
			const pos = position.value;
			const top = pos.top;
			const left = pos.left;
			const height = pos.height;
			const width = pos.width;
			let hasT = /t/.test(point);
			let hasB = /b/.test(point);
			let hasL = /l/.test(point);
			let hasR = /r/.test(point);
			let newLeft = 0;
			let newTop = 0;
			if (point.length === 2) {
				newLeft = hasL ? 0 : width;
				newTop = hasT ? 0 : height;
			} else {
				// 上下点，宽度固定在中间
				if (hasT || hasB) {
					newLeft = width / 2;
					newTop = hasT ? 0 : height;
				}
				// 左右点，高度固定在中间
				if (hasL || hasR) {
					newLeft = hasL ? 0 : width;
					newTop = height / 2;
				}
			}
			const style = {
				marginLeft: hasL || hasR ? '-3px' : 0,
				marginTop: hasT || hasB ? '-3px' : 0,
				left: `${newLeft + (isWrapElement ? 0 : left)}px`,
				top: `${newTop + (isWrapElement ? 0 : top)}px`,
				cursor:
					point
						.split('')
						.reverse()
						.map((m) => directionKey.value[m])
						.join('') + '-resize',
			};
			return style;
		};

		/**
		 * 鼠标按下
		 * @param {*} point
		 * @param {*} event
		 */
		const mousedownForMark = (point, event) => {
			console.log('resize', props.resize);
			event.stopPropagation();
			event.preventDefault();
			const pos = { ...position.value };
			let height = pos.height;
			let width = pos.width;
			let top = pos.top;
			let left = pos.left;
			let startX = event.clientX;
			let startY = event.clientY;
			let move = (event) => {
				let currX = event.clientX;
				let currY = event.clientY;
				let disY = currY - startY;
				let disX = currX - startX;
				let hasT = /t/.test(point);
				let hasB = /b/.test(point);
				let hasL = /l/.test(point);
				let hasR = /r/.test(point);
				let newHeight = +height + (hasT ? -disY : hasB ? disY : 0);
				let newWidth = +width + (hasL ? -disX : hasR ? disX : 0);
				if (!props.resize || props.resize === 'y') {
					pos.height = newHeight > 0 ? newHeight : 0;
				}
				if (!props.resize || props.resize === 'x') {
					pos.width = newWidth > 0 ? newWidth : 0;
				}
				pos.left = +left + (hasL ? disX : 0);
				pos.top = +top + (hasT ? disY : 0);
				props.handlePointMove(pos);
			};
			let up = () => {
				props.handlePointMouseUp();
				document.removeEventListener('mousemove', move);
				document.removeEventListener('mouseup', up);
			};
			document.addEventListener('mousemove', move);
			document.addEventListener('mouseup', up);
		};
		/**
		 * 给 当前选中元素 添加鼠标移动相关事件
		 * @param {*} event
		 */
		const mousedownForElement = (event) => {
			const pos = { ...position.value };
			let startY = event.clientY;
			let startX = event.clientX;
			let startTop = pos.top;
			let startLeft = pos.left;

			let move = (event) => {
				// !#zh 移动的时候，不需要向后代元素传递事件，只需要单纯的移动就OK
				event.stopPropagation();
				event.preventDefault();

				let currX = event.clientX;
				let currY = event.clientY;
				pos.top = currY - startY + startTop;
				pos.left = currX - startX + startLeft;
				props.handleElementMove(pos);
			};

			let up = () => {
				props.handleElementMouseUp();
				document.removeEventListener('mousemove', move, true);
				document.removeEventListener('mouseup', up, true);
			};
			document.addEventListener('mousemove', move, true);
			document.addEventListener('mouseup', up, true);
		};
		/**
		 * 鼠标按下
		 * @param {*} event
		 */
		const handleMousedown = (event) => {
			if (props.handleMousedown) {
				props.handleMousedown();
				mousedownForElement(event);
			}
		};
		/**
		 * 键盘快捷键删除元素
		 * @param {*} event
		 */
		const handleDeleteByKeyboard = (event) => {
			const key = event.keyCode || event.charCode;
			if (key === 46 || key === 110) {
				// Delete、数字键盘的 .
				emit('delete');
			}
		};
		/**
		 * 检测键盘按键，按下行为
		 * @param {*} event
		 */
		const handleKeyPressed = (event) => {
			handleDeleteByKeyboard(event);
		};

		return () => (
			<div
				tabIndex="0"
				class={{ 'shape-wrapper': active.value }}
				onClick={(event) => {
					console.log('onClick', event);
					event.preventDefault();
					event.stopPropagation();
				}}
				onKeydown={handleKeyPressed}
				onMousedown={handleMousedown}
			>
				{active.value &&
					points.map((point) => {
						const pointStyle = getPointStyle(point);
						return (
							<div
								key={point}
								data-point={point}
								style={pointStyle}
								class="shape-point"
								onMousedown={(event) => mousedownForMark(point, event)}
							></div>
						);
					})}
				{slots.default && slots.default()}
			</div>
		);
	},
};
