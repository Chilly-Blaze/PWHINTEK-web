<!--
 * @Author: ChillyBlaze
 * @Date: 2022-05-23 20:36:51
 * @LastEditTime: 2022-06-16 19:30:09
 * @FilePath: /front-end/src/views/Home/index.vue
 * @Description: 个人界面
-->
<template>
	<button @click="logout">登出</button>
	<button @click="myInfo">查询个人信息</button>
	<p>{{ info }}</p>
	<button @click="myArticle">个人文章</button>
</template>

<script setup lang="ts">
	import { PMessage } from '@/components'
	import { useUserInfoStore } from '@/stores/userInfo'
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'
	import { loginMessages } from '@/lang/zh'
	import { rMyArticle, reqTest } from '../../api/index'
	let info = ref<UserInfo>()
	const store = useUserInfoStore()
	const router = useRouter()
	async function logout() {
		try {
			await store.clearInfo()
			PMessage.success(loginMessages.hint.logoutSuccess)
			router.push({ name: 'public' })
		} catch (err: any) {
			PMessage.error(err)
		}
	}
	function myInfo() {
		info.value = store.info
	}
	async function myArticle() {
		try {
			const result = await rMyArticle(1)
			const pageList = result.data
		} catch (err: any) {}
	}
</script>

<style scoped></style>
