import { defineComponent } from 'vue';
import PropTypes from 'editor/common/propTypes';

export default defineComponent({
	name: 'x-audio',
	extra: {
		type: 2,
		icon: 'audio',
		title: '音频',
		defaultStyle: {
			width: 280,
			height: 50,
		},
		resize: 'x',
	},
	props: {
		src: PropTypes.string({
			label: '音频地址',
			defaultValue: '',
			props: { type: 'textarea', rows: 5 },
		}),
		// poster: PropTypes.string({ label: '封面', defaultValue: '', props: { type: 'textarea', rows: 5 } }),
		autoplay: PropTypes.boolean({ label: '自动播放', defaultValue: false }),
		loop: PropTypes.boolean({ label: '循环播放', defaultValue: true }),
	},
	setup(props) {
		return () => (
			<audio
				controls
				src={props.src}
				poster={props.poster}
				autoplay={props.autoplay}
				loop={props.loop}
			></audio>
		);
	},
});
