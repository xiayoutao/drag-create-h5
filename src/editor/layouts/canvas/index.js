import { computed, ref } from 'vue';
import RenderEditCanvas from './edit';

import '../styles/canvas.scss';

export default {
	name: 'layout-canvas',
	props: ['elements'],
	setup(props) {
		const scaleRate = ref(1);
		const elements = computed(() => props.elements);

		return () => (
			<div
				class="xia-editor-canvas"
				style={{
					transform: `scale(${scaleRate.value})`,
					'transform-origin': 'center top',
				}}
			>
				<div class="canvas-wrapper" style={{ height: '100%' }}>
					<RenderEditCanvas elements={elements.value}></RenderEditCanvas>
				</div>
			</div>
		);
	},
};
