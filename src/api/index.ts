/*
 * @Author: ChillyBlaze
 * @Date: 2022-04-25 18:59:32
 * @LastEditTime: 2022-05-22 22:21:23
 * @FilePath: /front-end/src/api/index.ts
 * @Description:统一api封装
 */

// api统一管理
import { service } from '@/utils/request'

import type { resposeData as R } from '@/utils/request'

export const reqTest = () => service.post<R>('user/test')
export const rLogin = (username: string, password: string) =>
	service.post<R>('user/login', { username, password })
export const rSignup = (
	username: string,
	password: string,
	nickname: string,
) => service.post<R>('user/signup', { username, password, nickname })
export const rLogout = () => service.post<R>('user/logout')
