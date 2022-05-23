<!--
 * @Author: ChillyBlaze
 * @Date: 2022-05-23 20:48:16
 * @LastEditTime: 2022-05-23 23:04:10
 * @FilePath: /front-end/src/views/Public/index.vue
 * @Description: 广场页面
-->
<template>
	<button @click="login">登录</button>
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router'
	const router = useRouter()
	function login() {
		router.push('/login')
	}
</script>

<style scoped></style>
