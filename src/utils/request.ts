import axios from 'axios'

type resposeData = {
	ok: boolean
	failMsg: string
	data: any
}

const service = axios.create({
	baseURL: '/api',
	timeout: 5000,
})

service.interceptors.request.use(
	config => {
		// 一些需要添加到请求头里面的东西
		return config
	},
	error => {
		Promise.reject(error)
	},
)

service.interceptors.response.use(
	resp => {
		const res: resposeData = resp.data
		if (res.ok) return res.data
		// 仅返回错误信息，不弹窗
		else {
			return Promise.reject(res.failMsg)
		}
	},
	err => {
		return Promise.reject('请求出问题了！')
	},
)

export default service
