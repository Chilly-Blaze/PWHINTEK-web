<!--
 * @Author: ChillyBlaze
 * @Date: 2022-09-03 20:00:22
 * @LastEditTime: 2022-09-04 15:34:16
 * @FilePath: /front-end/src/svg/Camera.vue
 * @Description: 相机svg，外部调用需要指定宽高
 * Copyright (c) 2022 by ChillyBlaze l135163642@gmail.com, All Rights Reserved. 
-->
<template>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<path
			d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
		></path>
		<circle cx="12" cy="13" r="4"></circle>
	</svg>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
	@import '@/assets/mixin.scss';
	svg {
		fill: none;
		stroke: var(--font-color);
		stroke-width: 1.5;
		stroke-linecap: 'round';
		stroke-linejoin: 'round';
	}
</style>
