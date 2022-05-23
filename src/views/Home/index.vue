<!--
 * @Author: ChillyBlaze
 * @Date: 2022-05-23 20:36:51
 * @LastEditTime: 2022-05-23 23:02:23
 * @FilePath: /front-end/src/views/Home/index.vue
 * @Description: 个人界面
-->
<template>
	<button @click="logout">登出</button>
	<button @click="myInfo">查询个人信息</button>
	<p>{{ info }}</p>
</template>

<script setup lang="ts">
	import { rLogout, rMyInfo } from '@/api'
	import { PMessage } from '@/components'
	import { useUserInfoStore } from '@/stores/userInfo'
	import { useMessage } from 'naive-ui'
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'
	const message = useMessage()
	let info = ref<UserInfo>()
	const store = useUserInfoStore()
	const router = useRouter()
	async function logout() {
		console.log(store.info)
		try {
			await store.clearInfo()
			message.success('登出成功', PMessage)
			router.push('/')
		} catch (err: any) {
			message.error(err, PMessage)
		}
	}
	async function myInfo() {
		try {
			info.value = await store.getInfo()
		} catch (err: any) {
			message.error(err, PMessage)
		}
	}
</script>

<style scoped></style>
