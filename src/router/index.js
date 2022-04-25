import { createRouter, createWebHistory } from 'vue-router';
import { siteName } from '@/constants';

const importPage = (view) => () => import(`@/views/${view}`);
// const importFrame = view => () => import(`@/layouts/${view}`);

const router = createRouter({
	history: createWebHistory(),
	routes: [
		// {
		//   path: '/',
		//   redirect: '/home',
		//   component: importFrame('Frame.vue'),
		//   children: [
		//     {
		//       path: '/home',
		//       component: importPage('home.vue'),
		//     },
		//     {
		//       path: '/preview',
		//       component: importPage('preview.vue'),
		//     },
		//     {
		//       path: '/editor',
		//       component: importPage('editor.vue'),
		//     }
		//   ]
		// },
		{
			path: '/home',
			component: importPage('home.vue'),
		},
		{
			path: '/preview',
			component: importPage('preview.vue'),
		},
		{
			path: '/editor',
			component: importPage('editor.vue'),
		},
	],
});

router.beforeEach((to, from, next) => {
	next();
});

router.afterEach((to) => {
	// 修改页面title
	document.title = to.meta.title ? to.meta.title : siteName;
});

export default router;
