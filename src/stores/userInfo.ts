/*
 * @Author: ChillyBlaze
 * @Date: 2022-04-23 12:59:27
 * @LastEditTime: 2022-05-24 18:20:15
 * @FilePath: /front-end/src/stores/userInfo.ts
 * @Description: 用户信息全局存储
 */
import { defineStore } from 'pinia'
import { rMyInfo, rLogout } from '../api/index'

export const useUserInfoStore = defineStore({
	id: 'userInfo',
	state: () => ({
		info: undefined as UserInfo | undefined,
	}),
	actions: {
		async updateInfo() {
			try {
				const resp = await rMyInfo()
				this.info = resp.data.data
				return Promise.resolve()
			} catch (err: any) {
				return Promise.reject(err)
			}
		},
		async clearInfo() {
			try {
				await rLogout()
				this.info = undefined
				return Promise.resolve()
			} catch (err: any) {
				return Promise.reject(err)
			}
		},
	},
})
