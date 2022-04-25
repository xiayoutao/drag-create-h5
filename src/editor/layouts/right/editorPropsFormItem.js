import { computed } from 'vue';
import useElement from 'editor/hooks/useElement';
import useLayout from 'editor/hooks/useLayout';
import DataGrid from 'editor/support/data-grid';
import RenderElement from 'editor/support/render-element';
import { uploadExcel } from 'editor/common/tools';

export default {
	name: 'propsFormItem',
	props: ['data'],
	setup(props) {
		const { rightPanelWidth, rightPanelToolsWidth } = useLayout();
		const { updateElement } = useElement();
		const propsData = computed(() => JSON.parse(JSON.stringify(props.data)));
		const component = computed(() => propsData.value.component);

		const renderColorPicker = (data) => {
			let colors = computed(() => {
				if (data.data instanceof Array) {
					return [...data.data];
				}
				return [data.data];
			});
			return (
				<div class="colors-panel">
					{colors.value.map((item, index) => {
						return (
							<RenderElement
								style="margin: 5px 5px 5px 0"
								component="color-picker"
								data={item}
								props={{ size: 'mini' }}
								onChange={(val) => {
									colors.value[index] = val;
									updateElement({
										name: data.name,
										data: colors.value,
									});
								}}
							></RenderElement>
						);
					})}
				</div>
			);
		};

		const renderPosition = (data) => {
			const position = computed(() => {
				return [...data.data];
			});
			return (
				<div class="position">
					{position.value.map((item, index) => {
						return (
							<>
								<span style="color: #606060;">{index === 0 ? 'X' : 'Y'}：</span>
								<el-input
									v-model={item}
									style={{
										width: '50px',
										marginRight: index === 0 ? '10px' : 0,
									}}
									size="mini"
									onInput={(val) => {
										position.value[index] = val - 0;
										updateElement({
											name: data.name,
											data: position.value,
										});
									}}
								></el-input>
							</>
						);
					})}
				</div>
			);
		};

		const renderExcel = (data) => {
			return (
				<div class="excel-panel">
					<div class="excel-button">
						<el-upload
							ref="upload"
							action="/"
							show-file-list={false}
							onChange={uploadExcel}
							auto-upload={false}
						>
							<el-button type="success" size="small">
								导入数据
							</el-button>
						</el-upload>
					</div>
					<div
						class="excel-sheet"
						style={{
							width:
								rightPanelWidth.value - rightPanelToolsWidth.value - 20 + 'px',
						}}
					>
						<DataGrid
							data={data.data}
							onChange={(val) =>
								updateElement({
									name: data.name,
									data: val,
								})
							}
						/>
					</div>
				</div>
			);
		};

		// 表单
		const renderForm = (data) => {
			const dataList = computed(() => JSON.parse(JSON.stringify(data.data)));
			return (
				<el-form
					class="props-form"
					label-width="76px"
					size="mini"
					style="width: 100%; margin-top: 10px"
				>
					{dataList.value.map((item, index) => {
						return (
							<el-form-item label={item.label}>
								{item.component === 'input-number' ? (
									<el-input-number
										v-model={item.data}
										{...(item.props || {})}
										onChange={(val) => {
											dataList.value[index].data = val;
											updateElement({
												name: data.name,
												data: dataList.value,
											});
										}}
									></el-input-number>
								) : null}
								{item.component === 'select' ? (
									<el-select
										v-model={item.data}
										{...item.props}
										onChange={(val) => {
											dataList.value[index].data = val;
											updateElement({
												name: data.name,
												data: dataList.value,
											});
										}}
									>
										{item.options.map((subitem) => {
											return <el-option {...subitem}></el-option>;
										})}
									</el-select>
								) : null}
								{item.component === 'color' ? (
									<el-color-picker
										v-model={item.data}
										{...(item.props || {})}
										onChange={(val) => {
											dataList.value[index].data = val;
											updateElement({
												name: data.name,
												data: dataList.value,
											});
										}}
										show-alpha
									></el-color-picker>
								) : null}
							</el-form-item>
						);
					})}
				</el-form>
			);
		};

		return () => {
			if (component.value === 'color-picker') {
				// 颜色选择器
				return renderColorPicker(propsData.value);
			} else if (component.value === 'form') {
				// 表单
				return renderForm(propsData.value);
			} else if (component.value === 'position') {
				// 坐标
				return renderPosition(propsData.value);
			} else if (component.value === 'excel-editor') {
				// 在线表格
				return renderExcel(propsData.value);
			}
			// 以上为特殊处理组件，下面是通用的
			return (
				<RenderElement
					component={component.value}
					props={propsData.value.props}
					data={propsData.value.data}
					options={propsData.value.options || []}
					onChange={(val) =>
						updateElement({
							name: propsData.value.name,
							data: val,
						})
					}
				></RenderElement>
			);
		};
	},
};
