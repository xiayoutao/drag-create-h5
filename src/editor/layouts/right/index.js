import RightToolsQuick from './tools';
import RightEditor from './editor';

import '../styles/right.scss';

export default {
	name: 'layout-right',
	props: ['panelWidth'],
	setup(props) {
		return () => {
			return (
				<div
					class="xia-editor-right"
					style={{ width: `${props.panelWidth}px` }}
				>
					<RightToolsQuick></RightToolsQuick>
					<RightEditor></RightEditor>
				</div>
			);
		};
	},
};
