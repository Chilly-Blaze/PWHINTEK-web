<!--
 * @Author: ChillyBlaze
 * @Date: 2022-04-28 12:43:42
 * @LastEditTime: 2022-05-22 22:21:50
 * @FilePath: /front-end/src/components/Test.vue
 * @Description: 测试用例
-->
<template>
	<button @click="test">123123</button>
</template>

<script setup lang="ts">
	import { useMessage } from 'naive-ui'
	import { PMessage } from '@/components/Message'
	import { rLogin, rSignup, rLogout } from '../api/index'
	const message = useMessage()
	async function test() {
		try {
			await rLogout()
			message.success('登出成功', PMessage)
		} catch (err: any) {
			message.error(err, PMessage)
		}
	}
</script>

<style scoped></style>
