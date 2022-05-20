import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import XiaEditor, { key, store as XiaEditorStore } from 'editor';
console.log('XiaEditorStore', XiaEditorStore);

const app = createApp(App);

app
	.use(router)
	.use(store)
	.use(ElementPlus)
	.use(XiaEditorStore, key)
	.use(XiaEditor)
	.mount('#app');

app.config.devtools = process.env.NODE_ENV !== 'production';

console.log('app', app);
