import { defineComponent } from 'vue';
import PropTypes from 'editor/common/propTypes';

export default defineComponent({
	name: 'x-map',
	extra: {
		type: 2,
		icon: 'map',
		title: '地图',
		defaultStyle: {
			width: 360,
			height: 360,
		},
	},
	props: {
		pointName: PropTypes.string({ label: '地点名称', defaultValue: '' }),
		mapKey: PropTypes.string({ label: '腾讯地图Key', defaultValue: '' }),
		position: PropTypes.position({ label: '经纬度', defaultValue: [0, 0] }),
	},
	setup(props) {
		console.log(props);
		return () => <div>地图</div>;
	},
});
