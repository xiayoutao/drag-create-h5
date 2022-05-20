import { ElMessage } from 'element-plus';
import { xlsxReader } from './export';

export function uploadExcel(file) {
	const type = file.name.split('.')[1];
	if (!['xls', 'xlsx'].includes(type)) {
		ElMessage({ type: 'warning', message: '格式错误，请重新选择！' });
		return;
	}
	xlsxReader(file).then(async (tab) => {
		console.log('excel文件内容', tab);
		if (tab && tab.length > 0) {
			tab.forEach((item) => {
				(item.sheet || []).map((subitem) => {
					return {
						...subitem,
					};
				});
			});
			ElMessage({ type: 'success', message: '文件已上传' });
		} else {
			ElMessage({ type: 'error', message: '没有解析到数据' });
		}
	});
}
