<!--
 * @Author: ChillyBlaze
 * @Date: 2022-05-23 20:38:11
 * @LastEditTime: 2022-09-16 15:04:15
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
	import Logo from '@/svg/Logo.vue'
</script>

<style scoped lang="scss">
	.bg-layer {
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		max-width: 80vw;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		opacity: 0.5;
		background-color: white;
		z-index: -100;
	}
	.content {
		position: absolute;
		width: 90%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
