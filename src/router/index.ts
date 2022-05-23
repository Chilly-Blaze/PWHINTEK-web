/*
 * @Author: ChillyBlaze
 * @Date: 2022-04-23 12:59:27
 * @LastEditTime: 2022-05-23 23:06:32
 * @FilePath: /front-end/src/router/index.ts
 * @Description:
 */
import { PLayout } from '@/components'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'main',
			component: PLayout,
			children: [
				{
					path: 'home',
					name: 'home',
					component: () => import('@/views/Home/index.vue'),
				},
				{
					path: '',
					name: 'public',
					component: () =>
						import('@/views/Public/index.vue'),
				},
			],
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('@/views/Login/index.vue'),
		},
	],
})
//TODO: 前置路由守卫

export { router }
