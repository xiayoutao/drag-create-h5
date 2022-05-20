import { defineComponent } from 'vue';
import PropTypes from 'editor/common/propTypes';

export default defineComponent({
	name: 'x-background',
	extra: {
		visible: false,
		type: 0,
		icon: 'background',
		title: '背景',
	},
	props: {
		bgImage: PropTypes.image({ label: '背景图', defaultValue: '' }),
		bgColor: PropTypes.color({ label: '背景色', defaultValue: 'transparent' }),
		bgMusic: PropTypes.string({ label: '背景音乐', defaultValue: '' }),
	},
	setup(props) {
		return () => (
			<div
				ref="root"
				style="width: 100%; height: 100%; overflow: hidden; position: absolute; z-index: 0; opacity: 1;"
			>
				<div
					style={{
						backgroundColor: props.bgColor,
						backgroundImage: props.bgImage,
					}}
				></div>
				{props.bgMusic && <audio src={props.bgMusic} autoplay loop></audio>}
			</div>
		);
	},
});
