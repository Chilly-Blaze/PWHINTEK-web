<!--
 * @Author: ChillyBlaze
 * @Date: 2022-04-28 12:43:42
 * @LastEditTime: 2022-05-23 22:54:26
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
	import { useRouter } from 'vue-router'
	const router = useRouter()
	function test() {
		router.push('/login')
	}
</script>

<style scoped></style>
