<!--
 * @Author: ChillyBlaze
 * @Date: 2022-04-27 21:32:13
 * @LastEditTime: 2022-05-21 21:56:41
 * @FilePath: /front-end/src/components/Input/PInputTemplate.vue
 * @Description: 通用化输入框组件，返回输入值
-->
<template>
	<div class="input" tabindex="1">
		<input
			ref="input"
			:value="props.modelValue"
			:placeholder="props.msg"
			@input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
		/>
		<svg class="hint">
			<line
				ref="line"
				x1="1"
				y1="5"
				:x2="props.width + 'px'"
				y2="5"
			/>
		</svg>
		<slot name="feature" />
	</div>
</template>

<script setup lang="ts">
	// 前置导入
	import { reactive, watch, ref } from 'vue'
	import gsap from 'gsap'

	interface Props {
		// placeholder内容
		msg: string
		// 输入框长宽
		width: number
		height: number
		// 输入内容是否正确
		isCorrect: boolean
		modelValue?: string
		isFocus?: boolean
	}
	/**
	 * props段
	 * 包含输入框基本信息：placeholder，长宽，类型，是否正确
	 */
	const props = defineProps<Props>()

	/**
	 * data段
	 * 获取dom
	 */
	let input = ref<HTMLInputElement>()
	let line = ref<SVGLineElement>()
	/**
	 * data段
	 * 输入框提示色，受props.isCorrect控制
	 */
	let hintResponsiveColor = ref<string>(
		props.isCorrect
			? 'var(--stroke-hint-color)'
			: 'var(--stroke-hint-error-color)',
	)

	/**
	 * expose段
	 * 暴露输入框内容和输入框dom
	 */
	defineExpose({
		input,
	})

	/**
	 * watch段
	 * 监视props.modelValue，动态显示清除按钮和提示线
	 */
	watch(
		() => props.modelValue,
		(newValue) => {
			let bool = newValue!.length > 0
			let lineLength = bool ? (newValue!.length * 10) / 2 : 10
			lineLength =
				lineLength > props.width - props.height * 2
					? props.width - props.height * 2
					: lineLength
			let dasharray = lineLength + ' 10000'
			gsap.to(line.value!, {
				'stroke-dasharray': dasharray,
				duration: 0.2,
				ease: 'elastic.out(2, .3)',
			})
		},
	)

	/**
	 * watch段
	 * 监视props.isCorrect，动态改变输入框提示线颜色
	 */
	watch(
		() => props.isCorrect,
		(newValue) => {
			let currentColor = newValue
				? 'var(--stroke-hint-color)'
				: 'var(--stroke-hint-error-color)'
			hintResponsiveColor.value = currentColor
		},
	)
</script>

<style scoped lang="scss">
	@import '@/assets/mixin.scss';
	.input {
		@include pagePara;
		// 输入框长宽
		--height: v-bind('props.height + "px"');
		--width: v-bind('props.width + "px"');

		height: var(--height);
		width: var(--width);
		display: flex;
		position: relative;
		overflow: hidden;
		border-radius: 8px;
		background: var(--component-background-color);
		box-shadow: var(--component-light-shadow);
		transition: box-shadow 0.2s;

		// 输入框
		input {
			// 默认值去除
			-webkit-appearance: none;
			background: none;
			border: none;
			outline: none;
			// 自身属性
			width: 100%;
			padding: 12px 16px;
			// 文本属性和其他修饰
			font-family: inherit;
			font-size: calc(var(--height) - 30px);
			font-weight: 900;
			color: var(--font-color);
			// 聚焦时显示提示线
			&:focus + .hint {
				line {
					opacity: 1;
				}
			}
			// 触碰时改变提示色
			&::placeholder {
				color: var(--font-hint-color);
				transition: color 0.2s;
			}
			// placeholder触摸换色
			&:hover::placeholder {
				color: var(--font-hover-color);
			}
		}

		// 提示线
		.hint {
			// 默认值去除
			user-select: none;
			pointer-events: none;
			// 显示属性
			position: absolute;
			bottom: 4px;
			left: 20px;
			z-index: 1;
			// 自身属性
			width: v-bind('props.width + "px"');
			height: 10px;

			// 初始化提示线
			line {
				stroke-width: 3px;
				stroke-linecap: round;
				stroke-linejoin: round;
				stroke-dasharray: 10 10000;
				stroke-dashoffset: -1;
				opacity: 0;
				transition: all 0.5s ease-in-out;
				stroke: v-bind('hintResponsiveColor');
			}
		}
		// 父容器隐藏阴影
		&:focus-within {
			box-shadow: none;
		}
	}
</style>
