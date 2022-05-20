import useLayout from 'editor/hooks/useLayout';

export default {
	name: 'right-tools',
	setup() {
		const { rightPanelToolsWidth } = useLayout();
		return () => (
			<div
				class="quick-tools"
				style={{ width: `${rightPanelToolsWidth.value}px` }}
			>
				<div class="tool-item" data-hint="撤销">
					<span class="tool-icon"></span>
				</div>
				<div class="tool-item" data-hint="恢复">
					<span class="tool-icon"></span>
				</div>
				<div class="tool-item" data-hint="预览">
					<span class="tool-icon"></span>
				</div>
				<div class="tool-item" data-hint="复制当前页">
					<span class="tool-icon"></span>
				</div>
				<div class="tool-item" data-hint="导入PSD">
					<span class="tool-icon"></span>
				</div>
				<div class="tool-item" data-hint="放大">
					<span class="tool-icon"></span>
				</div>
				<div class="tool-item" data-hint="缩小">
					<span class="tool-icon"></span>
				</div>
			</div>
		);
	},
};
