import { computed } from 'vue';
import { useStore } from 'vuex';
import { storeKey } from 'editor/common/constants';

export default function () {
	const store = useStore(storeKey);
	const elements = computed(() => store.getters.elements);
	const editingElement = computed(() => store.getters.editingElement);

	function updateElement(data) {
		store.commit('updateElement', data);
	}
	function elementManager(element) {
		store.commit('elementManager', element);
	}
	function setEditingElement(element) {
		store.commit('setEditingElement', element);
	}
	function setElementPosition(data) {
		store.dispatch('setElementPosition', data);
	}
	function recordElementRect(data) {
		store.dispatch('recordElementRect', data);
	}

	return {
		elements,
		editingElement,
		updateElement,
		elementManager,
		setEditingElement,
		setElementPosition,
		recordElementRect,
	};
}
