/*
 * @Author: ChillyBlaze
 * @Date: 2022-04-23 14:12:27
 * @LastEditTime: 2022-08-02 18:07:42
 * @FilePath: /front-end/src/utils/request.ts
 * @Description: Axios配置
 */
import axios from 'axios'
import { PMessage } from '@/components'

const service = axios.create({
	baseURL: '/api',
	timeout: 5000,
})

service.interceptors.request.use(
	(config) => {
		// 一些需要添加到请求头里面的东西
		return config
	},
	(error) => {
		Promise.reject(error)
	},
)

service.interceptors.response.use(
	(resp) => {
		const res: Result = resp.data
		if (res.ok) return resp
		else {
			PMessage.error(res.failMsg)
			return Promise.reject()
		}
	},
	(err) => {
		console.log(err.message)
		return Promise.reject('请求出问题了！')
	},
)

export { service }
