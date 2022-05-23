<!--
 * @Author: ChillyBlaze
 * @Date: 2022-05-15 16:44:57
 * @LastEditTime: 2022-05-23 20:07:02
 * @FilePath: /front-end/src/components/Button/EasyButton.vue
 * @Description: 较为平庸的按钮
-->

<template>
	<div><slot></slot></div>
</template>

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
		padding: var(--common-padding);
		cursor: pointer;
		&:hover {
			color: var(--font-hover-color);
			font-size: calc(var(--common-font-size) * 1.1);
			transition: 0.1s ease-in-out;
		}
		&:active {
			font-size: calc(var(--common-font-size) * 0.9);
			transition: 0.1s ease-in-out;
		}
	}
</style>
