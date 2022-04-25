export default {
	namespaced: true,
	state: {
		timestampDiff: 0,
	},
	getters: {
		timestampDiff: (state) => state.timestampDiff,
	},
	mutations: {
		updateDiff(state, diff) {
			state.timestampDiff = diff;
		},
	},
};
