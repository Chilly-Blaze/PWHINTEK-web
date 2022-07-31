<!--
 * @Author: ChillyBlaze
 * @Date: 2022-05-25 13:29:00
 * @LastEditTime: 2022-05-25 13:31:12
 * @FilePath: /front-end/src/views/Welcome/index.vue
 * @Description: 欢迎界面
-->
<template>
	<h1>PWHINTEK</h1>
	<button @click="enter">进入</button>
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router'

	const router = useRouter()
	const enter = () => {
		router.push({ name: 'public' })
	}
</script>

<style scoped></style>
