import { defineComponent, ref, watch } from 'vue';
import 'canvas-datagrid';

export default defineComponent({
	name: 'data-grid',
	props: ['data'],
	setup(props, { emit }) {
		const dataList = ref([]);
		// const keys = computed(() => dataList.value.length > 0 ? Object.keys(dataList.value[0]) : []);

		dataList.value = handleData(props.data);

		watch(props.data, (val) => {
			dataList.value = [];
			dataList.value = handleData(val);
		});

		watch(dataList.value, (val) => {
			emit('change', handleData(val));
		});

		function handleData(data) {
			return data.map((item) => {
				let obj = {};
				Object.keys(item).map((key) => {
					obj[key] = isNaN(item[key] - 0) ? item[key] : item[key] - 0;
				});
				return { ...obj };
			});
		}

		return () => {
			return (
				<canvas-datagrid
					style={{
						cellWidth: 80,
						cornerCellBackgroundColor: '#f4f5f8', // 左上角第一个单元格背景色
						columnHeaderCellBackgroundColor: '#f4f5f8',
						activeColumnHeaderCellBackgroundColor: '#e2efd9',
						showRowNumberGaps: false,
						rowHeaderCellWidth: 80, // Y轴索引列宽度
						rowHeaderCellBackgroundColor: '#f4f5f8',
						activeRowHeaderCellBackgroundColor: '#e2efd9',
						activeCellBorderColor: '#f00',
					}}
					data={dataList.value}
				></canvas-datagrid>
			);
			// return <el-table border data={dataList.value}>
			//   {
			//     keys.value.map(item => {
			//       return <el-table-column prop={item} label={item} width={100} v-slots={{
			//         default: (scope) => <el-input v-model={scope.row[item]} size="mini"></el-input>,
			//       }}></el-table-column>
			//     })
			//   }
			// </el-table>
		};
	},
});
