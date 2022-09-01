<!--
 * @Author: ChillyBlaze
 * @Date: 2022-05-15 16:44:57
 * @LastEditTime: 2022-08-31 22:57:08
 * @FilePath: /front-end/src/components/Button/Easy.vue
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
			scale: 1.1;
			transition: 0.1s ease-in-out;
		}
		&:active {
			scale: 0.9;
			transition: 0.1s ease-in-out;
		}
	}
</style>
