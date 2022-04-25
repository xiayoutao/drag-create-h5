import { ref } from 'vue';
import { ExcelEditor } from 'editor/support';

export default function () {
	const visible = ref(false);

	function showExcelEditor() {
		visible.value = true;
	}

	function hideExcelEditor() {
		visible.value = false;
	}

	return {
		visible,
		showExcelEditor,
		hideExcelEditor,
		ExcelEditor,
	};
}
