/*
 * @Author: ChillyBlaze
 * @Date: 2022-05-24 17:33:59
 * @LastEditTime: 2022-09-03 16:41:32
 * @FilePath: /front-end/src/utils/type.d.ts
 * @Description: 全局类型
 */

declare interface Result {
	ok: boolean
	failMsg: string
	data: any
}

declare interface UserInfo {
	username: string
	nickname: string
	permission: 'user' | 'admin'
	createTime: string
	avatar: string
}
