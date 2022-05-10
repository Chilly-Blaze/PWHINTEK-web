/*
 * @Author: ChillyBlaze
 * @Date: 2022-04-23 12:59:27
 * @LastEditTime: 2022-05-10 12:53:25
 * @FilePath: /front-end/src/router/index.ts
 * @Description:
 */
import { createRouter, createWebHistory } from 'vue-router'
import SignVue from '@/views/Login/index.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'login',
			component: SignVue,
		},
	],
})

export default router
