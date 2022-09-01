<!--
 * @Author: ChillyBlaze
 * @Date: 2022-09-01 10:42:05
 * @LastEditTime: 2022-09-01 11:20:47
 * @FilePath: /front-end/src/components/Avatar/Easy.vue
 * @Description: 头像组件基本模板
 * Copyright (c) 2022 by ChillyBlaze l135163642@gmail.com, All Rights Reserved. 
-->

<template>
	<div class="frame">
		<img alt="avatar" ref="img" src="/img/image.png" />
		<slot name="feature"></slot>
	</div>
</template>

<script setup lang="ts">
	//TODO: 需要初始化时发送请求获取后端头像，并且defineExpose暴露更新方法供父组件调用
	//TODO: 需要具有点击动画，有可选插槽
</script>

<style lang="scss" scoped>
	@import '@/assets/mixin.scss';
	.frame {
		@include pagePara;
		position: relative;
		width: 300px;
		height: 300px;
		font-size: 46px;
		color: var(--font-color);
		border-radius: 100%;
		overflow: hidden;
		img {
			width: 100%;
			height: 100%;
		}
	}
</style>
