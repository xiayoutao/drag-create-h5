export default {
	state: {
		leftPanelWidth: 260,
		rightPanelWidth: 300,
		rightPanelToolsWidth: 40,
	},
	getters: {
		leftPanelWidth: (state) => state.leftPanelWidth,
		rightPanelWidth: (state) => state.rightPanelWidth,
		rightPanelToolsWidth: (state) => state.rightPanelToolsWidth,
	},
	mutations: {
		setLeftPanelWidth(state, payload) {
			state.leftPanelWidth = payload;
		},
		setRightPanelWidth(state, payload) {
			state.rightPanelWidth = payload;
		},
	},
	actions: {},
};
