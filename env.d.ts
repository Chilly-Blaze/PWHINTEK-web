/// <reference types="vite/client" />
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
	portrait: string
}
