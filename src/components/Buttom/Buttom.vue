<!--
 * @Author: ChillyBlaze
 * @Date: 2022-04-25 18:28:03
 * @LastEditTime: 2022-05-10 09:44:46
 * @FilePath: /front-end/src/components/Buttom.vue
 * @Description: 通用化按钮组件，向外返回响应事件
-->

<template>
	<div
		class="svg-buttom"
		@touchstart="mouseDown"
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
			msg: string
			width: number
			height: number
		}>(),
		{
			msg: 'button',
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
		@include pageColor;
		@include pageShadow;
		--height: v-bind('stylePara.height');
		--width: v-bind('stylePara.width');
		--animation-para: 2s cubic-bezier(0.215, 0.61, 0.355, 1)
			forwards;
		// 显示样式
		position: relative;
		background-color: var(--component-background-color);

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
			font-size: 20px;
			cursor: pointer;
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
				border-radius: 8px;
				box-shadow: var(--component-shadow-light);
				transition: box-shadow 0.3s ease-in-out,
					color 0.8s ease-in-out 0.5s,
					border-radius 0.8s ease-in-out 0.8s;
				color: var(--font-hover-color);
			}
			// 点击动画
			.mouse-down {
				box-shadow: none;
				background-color: var(--component-hint-color);
				transition: 0.3s ease-out;
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
