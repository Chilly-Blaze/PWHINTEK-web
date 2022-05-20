<!--
 * @Author: ChillyBlaze
 * @Date: 2022-04-25 18:28:03
 * @LastEditTime: 2022-05-16 17:58:06
 * @FilePath: /front-end/src/components/Button/PComplexButton.vue
 * @Description: 花里胡哨一些的按钮
-->

<template>
	<div
		class="svg-buttom"
		@touchstart="mouseDown"
		@touchend="mouseUp"
		@mousedown="mouseDown"
		@mouseup="mouseUp"
		@mouseleave="mouseUp"
	>
		<svg version="1.1" xmlns="http://www.w3.org/2000/svg">
			<rect class="shape"></rect>
		</svg>
		<div class="text" :class="{ 'mouse-down': stylePara.isDown }">
			<slot>button</slot>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { reactive } from 'vue'

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

	/**
	 * methods段
	 * 按钮点击事件
	 */
	function mouseDown() {
		stylePara.isDown = true
	}
	function mouseUp() {
		stylePara.isDown = false
	}
</script>

<style scoped lang="scss">
	@import '@/assets/mixin.scss';
	// 全局长宽
	* {
		width: var(--width);
		height: var(--height);
	}

	// 总样式
	.svg-buttom {
		// 全局变量
		@include pagePara;
		--height: v-bind('stylePara.height');
		--width: v-bind('stylePara.width');
		--animation-para: 2s cubic-bezier(0.215, 0.61, 0.355, 1)
			forwards;
		// 显示样式
		position: relative;
		background-color: transparent;

		// SVG动画
		svg {
			// 默认样式修改
			overflow: visible;
			fill: transparent;

			.shape {
				// SVG属性
				stroke-width: 5px;
				stroke-linecap: round;
				stroke: var(--stroke-hint-color);
				stroke-dasharray: 30 10000;
				stroke-dashoffset: calc(
					15px - calc(var(--height) + var(--width) * 1.5)
				);
				// 恢复动画
				animation: restore var(--animation-para);
			}
		}

		// 按钮样式
		.text {
			// 默认值去除
			user-select: none;
			// 显示属性
			position: absolute;
			top: 0;
			// 自身属性
			cursor: pointer;
			font-size: var(--highlight-font-size);
			text-align: center;
			color: var(--font-color);
			line-height: var(--height);
			transition: 2s cubic-bezier(0.165, 0.84, 0.44, 1);
		}

		// 触摸反馈
		&:hover {
			// 触摸动画
			.shape {
				animation: draw var(--animation-para);
			}
			// 文字样式
			.text {
				font-size: calc(var(--highlight-font-size) * 1.1);
				border-radius: 8px;
				box-shadow: var(--component-light-shadow);
				transition: box-shadow 0.2s ease-in-out,
					color 0.6s ease-in-out 0.2s,
					border-radius 0.6s ease-in-out 0.6s,
					font-size 0.1s ease-in-out;
				color: var(--font-hover-color);
			}
			// 点击动画
			.mouse-down {
				font-size: calc(var(--highlight-font-size) * 0.9);
				box-shadow: none;
				background-color: var(--component-hint-color);
				transition: 0.1s linear;
			}
		}

		// 恢复动画
		@keyframes restore {
			0% {
				stroke: var(--font-hover-color);
				stroke-width: 0px;

				stroke-dashoffset: calc(
					-2 * var(--height) - 2 * var(--width)
				);
			}
			100% {
				stroke: var(--stroke-hint-color);
				stroke-width: 3px;
			}
		}
		// 触摸动画
		@keyframes draw {
			0% {
				stroke-dashoffset: calc(
					15px - calc(var(--height) + var(--width) * 1.5)
				);
				stroke-width: 3px;
			}
			100% {
				stroke-dasharray: calc(
					2 * var(--height) + 2 * var(--width)
				);
				stroke-dashoffset: 0;
				stroke-width: 0px;
				stroke: var(--font-hover-color);
			}
		}
	}
</style>
