/*
 * @Author: ChillyBlaze
 * @Date: 2022-05-24 18:02:27
 * @LastEditTime: 2022-05-24 18:20:53
 * @FilePath: /front-end/src/stores/other.ts
 * @Description: 杂项全局存储
 */
import type { MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider'
import { defineStore } from 'pinia'

export const useOtherStore = defineStore({
	id: 'other',
	state: () => ({
		message: undefined as MessageApiInjection | undefined,
	}),
})
