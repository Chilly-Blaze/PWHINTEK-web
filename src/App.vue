<!--
 * @Author: ChillyBlaze
 * @Date: 2022-04-23 12:59:27
 * @LastEditTime: 2022-05-23 21:34:47
 * @FilePath: /front-end/src/App.vue
 * @Description: 入口组件
-->
<template>
	<NMessageProvider :max="5">
		<RouterView />
		<Test />
	</NMessageProvider>
</template>

<script setup lang="ts">
	import { RouterView } from 'vue-router'
	import { NMessageProvider } from 'naive-ui'
	import Test from './components/Test.vue'
</script>
