/*
 * @Author: ChillyBlaze
 * @Date: 2022-04-23 12:59:27
 * @LastEditTime: 2022-05-24 18:23:26
 * @FilePath: /front-end/src/router/index.ts
 * @Description: 路由配置+守卫
 */
import { PLayout, PMessage } from '@/components'
import { createRouter, createWebHistory } from 'vue-router'
import pinia from '@/stores'
import { useUserInfoStore } from '@/stores/userInfo'
import 'vue-router'
import { useOtherStore } from '../stores/other'
declare module 'vue-router' {
	interface RouteMeta {
		permission: 'public' | 'user' | 'admin' | 'all'
	}
}
const store = useUserInfoStore(pinia)
const utilStore = useOtherStore(pinia)

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'main',
			component: PLayout,
			redirect: 'home',
			children: [
				{
					path: 'home',
					name: 'home',
					component: () => import('@/views/Home/index.vue'),
					meta: { permission: 'user' },
				},
				{
					path: 'public',
					name: 'public',
					component: () =>
						import('@/views/Public/index.vue'),
					meta: { permission: 'all' },
				},
			],
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('@/views/Login/index.vue'),
			meta: { permission: 'public' },
		},
	],
})
router.beforeEach((to, from) => {
	if (to.meta.permission === 'public' && store.info !== undefined)
		return false
	if (to.meta.permission === 'user' && store.info === undefined) {
		utilStore.message?.info('还没登录呢!', PMessage)
		return { name: 'login', params: { redirect: to.fullPath } }
	}
})

export { router }
