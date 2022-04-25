import { computed, reactive } from 'vue';

import './contextmenu.scss';

export default {
	props: ['position'],
	setup(props, { emit }) {
		const position = computed(() => props.position);
		console.log('position', position.value[0]);

		const canvasWrapper = document.querySelector('.canvas-wrapper');
		const { x, y } = canvasWrapper.getBoundingClientRect();

		const pos = reactive({
			left: position.value[0] - x,
			top: position.value[1] - y,
		});

		const menuList = [
			{ key: 'copy', label: '复制' },
			{ key: 'delete', label: '删除' },
		];

		const zIndexMenuList = [
			{ key: 'moveToTop', label: '置顶', type: 'zIndex' },
			{ key: 'moveToBottom', label: '置底', type: 'zIndex' },
			{ key: 'moveUp', label: '上移', type: 'zIndex' },
			{ key: 'moveDown', label: '下移', type: 'zIndex' },
		];

		function handleSelectMenu({ key }) {
			emit('select', { key });
		}

		return () => (
			<div
				class="contextmenu"
				style={{ left: pos.left + 'px', top: pos.top + 'px' }}
			>
				{menuList.map((item) => {
					return (
						<div
							class="contextmenu-item"
							onClick={() => handleSelectMenu(item)}
						>
							{item.label}
						</div>
					);
				})}
				<div class="contextmenu-item z-index line">
					{zIndexMenuList.map((item) => {
						return (
							<div class="sub" onClick={() => handleSelectMenu(item)}>
								{item.label}
							</div>
						);
					})}
				</div>
			</div>
		);
	},
};
