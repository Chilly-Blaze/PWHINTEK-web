<!--
 * @Author: ChillyBlaze
 * @Date: 2022-05-15 16:44:57
 * @LastEditTime: 2022-05-15 20:00:51
 * @FilePath: /front-end/src/components/Button/PEasyButton.vue
 * @Description: 较为平庸的按钮
-->

<template>
	<div><slot></slot></div>
</template>

<script setup lang="ts">
	import { reactive, ref } from 'vue'
	/**
	 * props段
	 * 接收外部传入按钮宽高，默认110+48
	 */
	const props = withDefaults(
		defineProps<{
			width: number
			height: number
		}>(),
		{
			width: 110,
			height: 40,
		},
	)

	/**
	 * data段
	 * 获取响应式长宽和点击事件
	 */
	const stylePara = reactive({
		isDown: false,
		width: props.width + 'px',
		height: props.height + 'px',
	})
</script>

<style scoped lang="scss">
	@import '@/assets/mixin.scss';
	div {
		@include pagePara;
		display: flex;
		user-select: none;
		font-size: var(--common-font-size);
		color: var(--font-color);
		justify-content: center;
		align-items: center;
		width: v-bind('stylePara.width');
		height: v-bind('stylePara.height');
		cursor: pointer;
		&:hover {
			color: var(--font-hover-color);
			font-size: calc(var(--common-font-size) * 1.2);
			transition: 0.2s ease-in-out;
		}
		&:active {
			font-size: calc(var(--common-font-size) * 0.9);
			transition: 0.1s ease-in-out;
		}
	}
</style>
