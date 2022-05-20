import { computed } from 'vue';
import { useStore } from 'vuex';
import { storeKey } from 'editor/common/constants';

export default function () {
	const store = useStore(storeKey);
	const leftPanelWidth = computed(() => store.getters.leftPanelWidth);
	const rightPanelWidth = computed(() => store.getters.rightPanelWidth);
	const rightPanelToolsWidth = computed(
		() => store.getters.rightPanelToolsWidth,
	);

	function setRightPanelWidth(data) {
		store.commit('setRightPanelWidth', data);
	}

	return {
		leftPanelWidth,
		rightPanelWidth,
		rightPanelToolsWidth,
		setRightPanelWidth,
	};
}
