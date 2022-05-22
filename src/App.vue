<!--
 * @Author: ChillyBlaze
 * @Date: 2022-04-23 12:59:27
 * @LastEditTime: 2022-05-22 22:31:59
 * @FilePath: /front-end/src/App.vue
 * @Description: 入口组件
-->
<template>
	<NMessageProvider :max="5">
		<div class="router">
			<RouterView />
			<Test />
		</div>
	</NMessageProvider>
</template>

<script setup lang="ts">
	import { RouterView } from 'vue-router'
	import { NMessageProvider } from 'naive-ui'
	import Test from './components/Test.vue'
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
		flex-direction: column;
		font-family: 'Trebuchet MS', Helvetica, Tahoma, Arial, STXihei,
			“华文细黑”, Heiti, “黑体”, “Microsoft YaHei”, “微软雅黑”,
			SimSun, “宋体”, sans-serif;
	}
</style>
