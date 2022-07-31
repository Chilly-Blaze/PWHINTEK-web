<!--
 * @Author: ChillyBlaze
 * @Date: 2022-05-23 20:38:11
 * @LastEditTime: 2022-05-26 20:52:18
 * @FilePath: /front-end/src/components/Layout/Layout.vue
 * @Description: 主界面统一布局
-->
<template>
	<div class="main">
		<div class="bg-layer"><Logo /></div>
		<div class="content"><RouterView /></div>
	</div>
</template>

<script setup lang="ts">
	import { RouterView } from 'vue-router'
	import Logo from '@/components/Logo/Logo.vue'
</script>

<style scoped lang="scss">
	.bg-layer {
		position: fixed;
		display: flex;
		width: 100%;
		max-width: 800px;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		background-color: red;
		opacity: 0.5;
		z-index: -1;
	}
	.content {
		position: absolute;
		display: grid;
		background-color: aqua;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
	}
</style>
