import { createStore } from 'vuex';
// import undoRedoPlugin from './plugins/undo-redo';
import editor from './modules/editor';
import element from './modules/element';

export default createStore({
	state: {},
	getters: {},
	mutations: {},
	modules: {
		editor,
		element,
	},
	plugins: [],
	strict: process.env.NODE_ENV !== 'production',
});
