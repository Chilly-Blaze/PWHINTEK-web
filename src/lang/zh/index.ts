/*
 * @Author: ChillyBlaze
 * @Date: 2022-05-23 18:18:06
 * @LastEditTime: 2022-05-23 19:26:58
 * @FilePath: /front-end/src/lang/zh/index.ts
 * @Description: 中文界面信息
 */
import { readonly } from 'vue'
const loginMessages = readonly({
	static: {
		toSignup: '还没帐号',
		toLogin: '想起来帐号了',
		username: '用户名',
		password: '密码',
		nickname: '昵称',
		loginButton: 'PONG!',
		signupButton: 'PING!',
	},
	hint: {
		nicknameRule: '1-10位，可以使用中英日文，数字和下划线~',
		usernameRule: '4-32位，可以使用英文数字和下划线~',
		passwordRule:
			'6位以上，可以使用中英文和或者一些不会引发奇怪反应的安全字符(._~!@#$^&*)~',
		loginSuccess: '登录成功',
		loginError: '用户名或密码格式输错了喵！',
		signupSuccess: '注册成功',
		signupError: '能不能好好看看注册信息的提示要求呀baka！',
	},
})

export { loginMessages }
