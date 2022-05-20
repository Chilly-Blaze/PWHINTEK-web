<!--
 * @Author: ChillyBlaze
 * @Date: 2022-04-23 12:59:27
 * @LastEditTime: 2022-05-20 10:51:11
 * @FilePath: /front-end/src/App.vue
 * @Description: 入口组件
-->
<template>
	<NMessageProvider>
		<div class="router">
			<!-- <RouterView /> -->
			<TestVue />
		</div>
	</NMessageProvider>
</template>

<script setup lang="ts">
	import { RouterView } from 'vue-router'
	import { NMessageProvider, useMessage } from 'naive-ui'
	import TestVue from './components/Test.vue'
	import { provide } from 'vue'
	// provide('$message', useMessage())
</script>

<style lang="scss">
	@import '@/assets/base.scss';
	.router {
		display: flex;
		overflow: scroll;
		height: 100vh;
		width: 100vw;
		align-items: center;
		justify-content: center;
		font-family: 'Trebuchet MS', Helvetica, Tahoma, Arial, STXihei,
			“华文细黑”, Heiti, “黑体”, “Microsoft YaHei”, “微软雅黑”,
			SimSun, “宋体”, sans-serif;
	}
</style>
