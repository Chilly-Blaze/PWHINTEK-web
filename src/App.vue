<!--
 * @Author: ChillyBlaze
 * @Date: 2022-04-23 12:59:27
 * @LastEditTime: 2022-05-10 20:52:51
 * @FilePath: /front-end/src/App.vue
 * @Description: 入口组件
-->
<template>
	<div class="router">
		<RouterView />
	</div>
</template>

<script setup lang="ts">
	import { RouterView } from 'vue-router'
</script>

<style lang="scss">
	@import '@/assets/base.scss';
	.router {
		display: flex;
		overflow: auto;
		height: 100vh;
		width: 100vw;
		align-items: center;
		justify-content: center;
		font-family: 'Trebuchet MS', Helvetica, Tahoma, Arial, STXihei,
			“华文细黑”, Heiti, “黑体”, “Microsoft YaHei”, “微软雅黑”,
			SimSun, “宋体”, sans-serif;
	}
</style>
