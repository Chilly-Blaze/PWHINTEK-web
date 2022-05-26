/*
 * @Author: ChillyBlaze
 * @Date: 2022-04-23 12:59:27
 * @LastEditTime: 2022-05-25 17:05:18
 * @FilePath: /front-end/src/router/index.ts
 * @Description: 路由配置+守卫
 */
import { PLayout, PMessage } from '@/components'
import { createRouter, createWebHistory } from 'vue-router'
import pinia from '@/stores'
import { useUserInfoStore } from '@/stores/userInfo'
import 'vue-router'
import { loginMessages } from '@/lang/zh'
declare module 'vue-router' {
	interface RouteMeta {
		permission: 'public' | 'user' | 'admin' | 'all'
	}
}
const store = useUserInfoStore(pinia)

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'main',
			component: PLayout,
			// redirect: 'welcome',
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
		{
			path: '/welcome',
			name: 'welcome',
			component: () => import('@/views/Welcome/index.vue'),
			meta: { permission: 'all' },
		},
	],
})
router.beforeEach(async (to, from) => {
	// @ts-ignore
	try {
		await store.updateInfo()
		if (to.meta.permission === 'public') return false
		if (from.name === 'welcome' && to.name === 'public')
			return { name: 'home' }
	} catch (error) {
		if (to.meta.permission === 'user') {
			PMessage.info(loginMessages.hint.notLoginError)
			return {
				name: 'login',
				params: { redirect: to.fullPath },
			}
		}
	}
})

export { router }
