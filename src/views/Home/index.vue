<!--
 * @Author: ChillyBlaze
 * @Date: 2022-05-23 20:36:51
 * @LastEditTime: 2022-05-24 17:53:07
 * @FilePath: /front-end/src/views/Home/index.vue
 * @Description: 个人界面
-->
<template>
	<button @click="logout">登出</button>
	<button @click="myInfo">查询个人信息</button>
	<p>{{ info }}</p>
</template>

<script setup lang="ts">
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
			router.push({ name: 'public' })
		} catch (err: any) {
			message.error(err, PMessage)
		}
	}
	function myInfo() {
		info.value = store.info
	}
</script>

<style scoped></style>
