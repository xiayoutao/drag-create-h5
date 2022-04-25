import XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export function handleExportData(data) {
	require.ensure([], () => {
		const exportData = data.list.map((item) =>
			data.filter.map((value) => item[value]),
		);
		export_json_to_excel(data.header, exportData, data.name);
	});
}

// xlsx读取数据
export function xlsxReader(file) {
	return new Promise(function (resolve, reject) {
		const reader = new FileReader();
		reader.onload = function (e) {
			const data = e.target.result;
			let wb = XLSX.read(data, {
				type: 'binary',
			});
			const result = [];
			console.log('wb', wb);
			wb.SheetNames.forEach((sheetName) => {
				result.push({
					sheetName: sheetName,
					axis: handleSheetAxis(wb.Sheets[sheetName]),
					sheet: XLSX.utils.sheet_to_json(wb.Sheets[sheetName]),
				});
			});
			resolve(result);
		};
		reader.onabort = (error) => {
			console.log(error);
			reject(error);
		};
		reader.onerror = (error) => {
			console.log(error);
			reject(error);
		};
		reader.readAsBinaryString(file.raw);
	});
}

/**
 * 获取x和y轴的值
 * @param {*} data
 */
export function handleSheetAxis(data) {
	let x = [];
	let y = [];
	Object.keys(data).forEach((key) => {
		if (key.includes('A') && key !== 'A1') {
			x.push(data[key].v);
		}
		if (key === 'B1' || key === 'C1') {
			y.push(data[key].v);
		}
	});
	return {
		x,
		y,
	};
}

export function export_json_to_excel(th, jsonData, defaultTitle) {
	var data = jsonData;
	data.unshift(th);
	var ws_name = 'SheetJS';

	var wb = new Workbook(),
		ws = sheet_from_array_of_arrays(data);

	/* add worksheet to workbook */
	wb.SheetNames.push(ws_name);
	wb.Sheets[ws_name] = ws;

	var wbout = XLSX.write(wb, {
		bookType: 'xlsx',
		bookSST: false,
		type: 'binary',
	});
	var title = defaultTitle || '列表';
	saveAs(
		new Blob([s2ab(wbout)], { type: 'application/octet-stream' }),
		title + '.xlsx',
	);
}

function generateArray(table) {
	var out = [];
	var rows = table.querySelectorAll('tr');
	var ranges = [];
	for (var R = 0; R < rows.length; ++R) {
		var outRow = [];
		var row = rows[R];
		var columns = row.querySelectorAll('td');
		for (var C = 0; C < columns.length; ++C) {
			var cell = columns[C];
			var colspan = cell.getAttribute('colspan');
			var rowspan = cell.getAttribute('rowspan');
			var cellValue = cell.innerText;
			if (cellValue !== '' && cellValue == +cellValue) cellValue = +cellValue;

			//Skip ranges
			ranges.forEach(function (range) {
				if (
					R >= range.s.r &&
					R <= range.e.r &&
					outRow.length >= range.s.c &&
					outRow.length <= range.e.c
				) {
					for (var i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null);
				}
			});

			//Handle Row Span
			if (rowspan || colspan) {
				rowspan = rowspan || 1;
				colspan = colspan || 1;
				ranges.push({
					s: { r: R, c: outRow.length },
					e: { r: R + rowspan - 1, c: outRow.length + colspan - 1 },
				});
			}

			//Handle Value
			outRow.push(cellValue !== '' ? cellValue : null);

			//Handle Colspan
			if (colspan) for (var k = 0; k < colspan - 1; ++k) outRow.push(null);
		}
		out.push(outRow);
	}
	return [out, ranges];
}

function sheet_from_array_of_arrays(data) {
	let ws = {};
	let range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };

	for (let R = 0; R != data.length; ++R) {
		for (let C = 0; C != data[R].length; ++C) {
			if (range.s.r > R) range.s.r = R;
			if (range.s.c > C) range.s.c = C;
			if (range.e.r < R) range.e.r = R;
			if (range.e.c < C) range.e.c = C;

			let cell = { v: data[R][C] };
			if (cell.v == null) continue;
			let cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

			if (typeof cell.v === 'number') {
				cell.t = 'n';
			} else if (typeof cell.v === 'boolean') {
				cell.t = 'b';
			} else if (cell.v instanceof Date) {
				cell.t = 'n';
				cell.z = XLSX.SSF._table[14];
				cell.v = datenum(cell.v);
			} else {
				cell.t = 's';
			}

			ws[cell_ref] = cell;
		}
	}
	if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
	return ws;
}

function datenum(v, date1904) {
	if (date1904) v += 1462;
	var epoch = Date.parse(v);
	return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function Workbook() {
	if (!(this instanceof Workbook)) return new Workbook();
	this.SheetNames = [];
	this.Sheets = {};
}

function s2ab(s) {
	var buf = new ArrayBuffer(s.length);
	var view = new Uint8Array(buf);
	for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
	return buf;
}

export function export_table_to_excel(id) {
	var theTable = document.getElementById(id);
	var oo = generateArray(theTable);
	var ranges = oo[1];

	/* original data */
	var data = oo[0];
	var ws_name = 'SheetJS';

	var wb = new Workbook(),
		ws = sheet_from_array_of_arrays(data);

	/* add ranges to worksheet */
	// ws['!cols'] = ['apple', 'banan'];
	ws['!merges'] = ranges;

	/* add worksheet to workbook */
	wb.SheetNames.push(ws_name);
	wb.Sheets[ws_name] = ws;

	var wbout = XLSX.write(wb, {
		bookType: 'xlsx',
		bookSST: false,
		type: 'binary',
	});

	saveAs(
		new Blob([s2ab(wbout)], { type: 'application/octet-stream' }),
		'test.xlsx',
	);
}
