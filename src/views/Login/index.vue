<!--
 * @Author: ChillyBlaze
 * @Date: 2022-04-25 20:46:09
 * @LastEditTime: 2022-05-24 22:07:07
 * @FilePath: /front-end/src/views/Login/index.vue
 * @Description: 登录界面
-->

<template>
	<div class="main">
		<div class="svgl">
			<Login :flag="data.page" />
		</div>
		<div class="svgr">
			<Signup :flag="!data.page" />
		</div>
		<div class="reverse" ref="reverse">
			<div class="login">
				<div class="login-bgimg">
					<img src="/img/login_pic.png" />
				</div>
				<PEButton
					class="front-hint-style"
					@click="toggle(false)"
					>{{ loginMessages.static.toSignup }}&gt</PEButton
				>
				<PTInput
					v-model="data.username"
					:isCorrect="isUsername"
					class="input-style"
					:msg="loginMessages.static.username"
				/>
				<PPInput
					v-model="data.password"
					:isCorrect="isPassword"
					class="input-style"
					:msg="loginMessages.static.password"
				/>
				<PCButton class="button-style" @click="login">{{
					loginMessages.static.loginButton
				}}</PCButton>
			</div>
			<div class="signup">
				<div class="login-bgimg">
					<img src="/img/login_pic.png" />
				</div>
				<PEButton
					class="back-hint-style"
					@click="toggle(true)"
					>&lt{{ loginMessages.static.toLogin }}</PEButton
				>
				<PPopover
					placement="left-start"
					:judge="!isNickname || false"
					:msg="loginMessages.hint.nicknameRule"
				>
					<PTInput
						v-model="data.nickname"
						:isCorrect="isNickname"
						class="input-style"
						:msg="loginMessages.static.nickname"
					/>
				</PPopover>
				<PPopover
					placement="left"
					:judge="!isUsername || false"
					:msg="loginMessages.hint.usernameRule"
				>
					<PTInput
						v-model="data.username"
						:isCorrect="isUsername"
						class="input-style"
						:msg="loginMessages.static.username"
					/>
				</PPopover>
				<PPopover
					placement="left-end"
					:judge="!isPassword || false"
					:msg="loginMessages.hint.passwordRule"
				>
					<PPInput
						v-model="data.password"
						:isCorrect="isPassword"
						class="input-style"
						:msg="loginMessages.static.password"
					/>
				</PPopover>
				<PCButton class="button-style" @click="signup">{{
					loginMessages.static.signupButton
				}}</PCButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import Login from './svg/Login.vue'
	import Signup from './svg/Signup.vue'
	import {
		PCButton,
		PEButton,
		PPInput,
		PTInput,
		PPopover,
		PMessage,
	} from '@/components'
	import { reactive, ref, readonly, computed } from 'vue'
	import gsap from 'gsap'
	import { rLogin, rSignup } from '@/api'
	import { loginMessages } from '@/lang/zh'
	import { useUserInfoStore } from '@/stores/userInfo'
	import { useRoute, useRouter } from 'vue-router'
	const router = useRouter()
	const route = useRoute()
	const store = useUserInfoStore()

	/**
	 * data段
	 * 登录信息
	 */
	const data = reactive({
		nickname: '',
		username: '',
		password: '',
		page: true,
	})

	function check(type: string, value: string) {
		const regs = new Map([
			['u', /^\w{4,32}$/],
			['p', /^[A-Za-z0-9._~!@#$^&*]{6,}$/],
			['n', /^[\u4e00-\u9fa5\w\u0800-\u4e00\x20]{1,10}$/],
		])
		return regs.get(type)?.test(value)
	}

	const isNickname = computed(() => {
		return check('n', data.nickname)
	})
	const isUsername = computed(() => {
		return check('u', data.username)
	})
	const isPassword = computed(() => {
		return check('p', data.password)
	})

	/**
	 * readonly段
	 * 随机背景图位置
	 */
	const readonlyData = readonly({
		bgRandom: Math.random() * 400 - 200 + 'px',
		msg: {
			nickname: '1-10位，可以使用中英日文，数字和下划线~',
			username: '4-32位，可以使用英文数字和下划线~',
			password:
				'6位以上，可以使用中英文和或者一些不会引发奇怪反应的安全字符(._~!@#$^&*)~',
		},
	})

	/**
	 * methods段
	 * 翻转动画
	 * @param v true:翻到登录页面 false:翻到注册页面
	 */
	let reverse = ref<HTMLDivElement>()
	function toggle(r: boolean) {
		let v = reverse.value!
		transition(v, r)
	}

	/**
	 * methods段
	 * 切换登录注册页面
	 * @param v 实际dom
	 * @param isReverse 翻转状态
	 */
	function transition(v: HTMLElement, isReverse: boolean) {
		let right = isReverse ? '0' : '25%'
		let rotateY = isReverse ? 0 : -540
		if (data.page === isReverse) return
		data.page = isReverse
		gsap.timeline()
			.delay(0.8)
			.to(v, {
				boxShadow: '0 1px 20px rgba(143, 136, 143, 0.5)',
				'--scale-X': 1.2,
				duration: 1,
			})
			.repeat(1)
			.yoyo(true)
		gsap.timeline()
			.delay(1)
			.to(v, {
				'--rotate-Y': -270,
				right: '12.5%',
				ease: 'power2.in',
				duration: 1,
			})
			.to(v, {
				'--rotate-Y': rotateY,
				right,
				ease: 'power2.out',
				duration: 1,
			})
	}

	/**
	 * methods段
	 * 登录
	 */
	async function login() {
		if (isUsername.value && isPassword.value) {
			try {
				await rLogin(data.username, data.password)
				await store.updateInfo()
				PMessage.success(loginMessages.hint.loginSuccess)
				route.params.redirect
					? router.push({
							path: route.params.redirect as string,
							replace: true,
					  })
					: router.push({ name: 'home', replace: true })
			} catch (err: any) {
				PMessage.error(err)
				router.push({ name: 'home', replace: true })
			}
		} else PMessage.error(loginMessages.hint.loginError)
	}

	/**
	 * methods段
	 * 注册
	 */
	async function signup() {
		if (
			isNickname.value &&
			isUsername.value &&
			isPassword.value
		) {
			try {
				await rSignup(
					data.username,
					data.password,
					data.nickname,
				)
				PMessage.success(loginMessages.hint.signupSuccess)
				toggle(true)
			} catch (err: any) {
				PMessage.error(err)
			}
		} else PMessage.error(loginMessages.hint.signupError)
	}
</script>

<style lang="scss" scoped>
	@import '@/assets/mixin.scss';
	.main {
		@include pagePara;
		--rotate-Y: 0deg;
		--scale-X: 1;
		--transform-random: v-bind('readonlyData.bgRandom');
		width: 30vw;
		height: 60vh;
		min-width: 350px;
		min-height: 500px;
		position: relative;
		.svgl,
		.svgr {
			top: 0;
			position: absolute;
			width: 40%;
			height: auto;
		}
		.svgr {
			right: 0;
		}
		.svgl {
			left: 0;
		}
		.reverse {
			position: absolute;
			width: 75%;
			height: 80%;
			bottom: 0;
			right: 0%;
			background-color: var(--component-background-color);
			border-radius: var(--common-border-radius);
			box-shadow: var(--component-light-shadow);
			z-index: 1;
			transform-style: preserve-3d;
			transform: rotateY(var(--rotate-Y)) scale(var(--scale-X));
			& > * {
				width: 100%;
				height: 100%;
				display: grid;
				justify-items: center;
				align-items: center;
				position: absolute;
				transform-style: preserve-3d;
				.input-style {
					transform: translateZ(50px);
				}
				.button-style {
					transform: translateZ(30px);
				}
				.front-hint-style {
					transform: translateZ(20px);
					cursor: pointer;
					justify-self: end;
				}
				.back-hint-style {
					transform: translateZ(20px);
					cursor: pointer;
					justify-self: start;
				}
				.login-bgimg {
					display: flex;
					justify-content: center;
					transform: translateZ(20px);
					position: absolute;
					height: 100%;
					width: 100%;
					overflow: hidden;
					img {
						transform: translateX(
							var(--transform-random)
						);
						height: 100%;
					}
				}
			}
			.login {
				grid-template-rows: repeat(4, 1fr) 0.3fr;
				transform: translateZ(1px);
			}
			.signup {
				grid-template-rows: repeat(5, 1fr) 0.3fr;
				transform: translateZ(-1px) rotateY(180deg);
				img {
					transform: rotateX(180deg);
				}
			}
		}
	}
</style>
