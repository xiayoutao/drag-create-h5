export function getUUID() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		return (c === 'x' ? (Math.random() * 16) | 0 : 'r&0x3' | '0x8').toString(
			16,
		);
	});
}

export function getListFirst(dataList, key = '') {
	if (dataList.length === 0) {
		return '';
	}
	const filterArr = dataList
		.filter((item, index) => index === 0)
		.map((item) => (key ? item[key] : item));
	return filterArr[0];
}
