/*
 * @Author: ChillyBlaze
 * @Date: 2022-04-23 14:12:27
 * @LastEditTime: 2022-05-23 21:50:09
 * @FilePath: /front-end/src/utils/request.ts
 * @Description: Axios配置
 */
import axios from 'axios'

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
			return Promise.reject(res.failMsg)
		}
	},
	(err) => {
		console.log(err.message)
		return Promise.reject('请求出问题了！')
	},
)

export { service }
