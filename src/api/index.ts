/*
 * @Author: ChillyBlaze
 * @Date: 2022-04-25 18:59:32
 * @LastEditTime: 2022-05-23 22:35:00
 * @FilePath: /front-end/src/api/index.ts
 * @Description:统一api封装
 */

// api统一管理
import { service } from '@/utils/request'

export const reqTest = () => service.post<Result>('user/test')
export const rLogin = (username: string, password: string) =>
	service.post<Result>('user/login', { username, password })
export const rSignup = (
	username: string,
	password: string,
	nickname: string,
) =>
	service.post<Result>('user/signup', {
		username,
		password,
		nickname,
	})
export const rLogout = () => service.post<Result>('user/logout')
export const rMyInfo = () => service.get<Result>('user/my_info')
