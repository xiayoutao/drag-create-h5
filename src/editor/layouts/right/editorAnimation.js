import { computed } from 'vue';
import { useStore } from 'vuex';
import { storeKey } from 'editor/common/constants';

export default {
	name: 'editor-animation',
	setup() {
		const store = useStore(storeKey);
		const editingElement = computed(() => store.getters.editingElement);
		const animations = computed(() =>
			editingElement.value ? editingElement.value.animations || [] : [],
		);

		const renderAnimationItem = (dataList) => {
			return dataList.map((item, index) => {
				return (
					<div class="animation-item">
						<div class="animation-title">
							<span class="name">动画{index + 1}</span>
							<span class="desc">{item.name}</span>
							<div class="operate">
								<span class="play"></span>
								<span class="delete"></span>
								<span class="arrow"></span>
							</div>
						</div>
						<div class="animation-setting">
							<el-row gutter={20} style="margin-bottom: 12px;">
								<el-col span={12}>
									<label class="setting-label">时间</label>
									<el-input
										size="mini"
										placeholder="时间"
										style="width: 64px"
									></el-input>
								</el-col>
								<el-col span={12}>
									<label class="setting-label">延迟</label>
									<el-input
										size="mini"
										placeholder="延迟"
										style="width: 64px"
									></el-input>
								</el-col>
							</el-row>
							<el-row gutter={20}>
								<el-col span={12}>
									<label class="setting-label">次数</label>
									<el-input
										size="mini"
										placeholder="次数"
										style="width: 64px"
									></el-input>
								</el-col>
								<el-col span={12}>
									<el-checkbox>循环播放</el-checkbox>
								</el-col>
							</el-row>
						</div>
					</div>
				);
			});
		};
		return () => (
			<div class="animation-wrapper">
				<div class="animation-btn">
					<el-button type="primary" icon="el-icon-plus" size="small">
						添加动画
					</el-button>
					<el-button
						icon="el-icon-caret-right"
						size="small"
						disabled={animations.value.length === 0}
					>
						添加动画
					</el-button>
				</div>
				<div class="animation-list">
					{renderAnimationItem(animations.value)}
				</div>
			</div>
		);
	},
};
