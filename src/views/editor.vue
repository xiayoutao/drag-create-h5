<template>
	<xia-editor id="xiayoutao" :getElements="getElements"></xia-editor>
</template>

<script>
import { onMounted } from 'vue';

export default {
	setup() {
		onMounted(() => {
			console.log('xiayoutao');
		});

		function getElements(elements) {
			console.log('组件列表', elements);
		}

		return {
			getElements,
		};
	},
};
</script>

<style lang="scss" scoped></style>
