import { defineComponent } from 'vue';
import PropTypes from 'editor/common/propTypes';

export default defineComponent({
	name: 'x-video',
	extra: {
		type: 2,
		icon: 'video',
		title: '视频',
		defaultStyle: {
			width: 360,
			height: 240,
		},
	},
	props: {
		src: PropTypes.string({
			label: '视频地址',
			defaultValue: '',
			props: { type: 'textarea', rows: 5 },
		}),
		poster: PropTypes.string({
			label: '封面',
			defaultValue: '',
			props: { type: 'textarea', rows: 5 },
		}),
		autoplay: PropTypes.boolean({ label: '自动播放', defaultValue: false }),
		controls: PropTypes.boolean({ label: '显示控件', defaultValue: true }),
		loop: PropTypes.boolean({ label: '循环播放', defaultValue: true }),
	},
	setup(props) {
		return () => (
			<video
				src={props.src}
				poster={props.poster}
				autoplay={props.autoplay}
				controls={props.controls}
				loop={props.loop}
			></video>
		);
	},
});
