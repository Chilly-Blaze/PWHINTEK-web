<!--
 * @Author: ChillyBlaze
 * @Date: 2022-05-03 19:29:39
 * @LastEditTime: 2022-05-22 13:37:32
 * @FilePath: /front-end/src/components/Input/TextInput.vue
 * @Description: 文本输入组件，子组件InputTamplate通过插槽集成整体清除动画
-->

<template>
	<PInputTemp
		:width="props.width"
		:height="props.height"
		:isCorrect="props.isCorrect"
		:msg="props.msg"
		ref="msg"
		v-model="text"
	>
		<template #feature>
			<button
				ref="clear"
				class="clear"
				:class="{ clearing: data.isClick }"
				@click="clickDel"
			>
				<svg viewBox="0 0 24 24">
					<path class="line" :d="d" />
					<path class="long" d="M9 15L20 4" />
					<path class="arrow" d="M13 11V7" />
					<path class="arrow" d="M17 11H13" />
				</svg>
			</button>
		</template>
	</PInputTemp>
</template>

<script setup lang="ts">
	import { PInputTemp } from '..'
	import { ref, reactive, computed, watch, readonly } from 'vue'
	import gsap from 'gsap'

	// 变量准备部分
	/**
	 * props段
	 * 接收外部传入宽高和placeholder
	 */
	const props = withDefaults(
		defineProps<{
			width: number
			height: number
			msg: string
			isCorrect: boolean
			modelValue?: string
		}>(),
		{
			width: 240,
			height: 48,
			isCorrect: true,
			msg: 'placeholder',
		},
	)

	interface exposeData {
		input: HTMLInputElement
	}
	/**
	 * data段
	 * 接收子组件的input dom用于聚焦和失焦
	 * 默认undefined，子组件加载完成之后会被赋值
	 */
	let msg = ref<exposeData>()

	/**
	 * data段
	 * 获取全局唯一button按钮dom内容，防止gsap动画串台
	 */
	let clear = ref<HTMLButtonElement>()

	/**
	 * data段
	 * 用于绑定输入框内容
	 */
	let text = ref('')

	/**
	 * data段
	 * 存储svg动画绑定参数
	 */
	const data = reactive({
		// 标记是否点击
		isClick: false,
	})

	/**
	 * emit段
	 * 触发父组件的v-model事件
	 */
	const emit = defineEmits(['update:modelValue'])

	/**
	 * watch段
	 * 监视props.modelValue变化，并将其赋值给text
	 */
	watch(
		() => props.modelValue,
		(val) => {
			text.value = val || ''
		},
	)

	/**
	 * readonly段
	 * 计算单次常量，用于描述动画过程
	 */
	const rData = readonly({
		// 清除结束位置定位
		inputWidthBefore: -props.width + props.height + 5 + 'px',
		inputWidthLine: -props.width + props.height / 2 + 17 + 'px',
	})

	/**
	 * data段
	 * 初始化 svg路径
	 */
	const rawD = reactive({
		m: 2,
		x1: 10,
		y1: 10,
		x2: 14,
		y2: 14,
	})
	/**
	 * computed段
	 * 计算SVG路径
	 */
	const d = computed(() => {
		return `M${rawD.m} ${rawD.m}
				C${rawD.x1} ${rawD.y1}
				${rawD.x2} ${rawD.y2} 22 22`
	})

	// 动画部分
	/**
	 * watch段
	 * 监视data.text，动态显示清除按钮
	 */
	watch(text, (newValue: string) => {
		let bool = newValue.length > 0
		let elem = clear.value!
		emit('update:modelValue', newValue)
		gsap.to(elem, {
			onStart() {
				gsap.set(elem, { display: 'block' })
			},
			'--clear-scale': bool ? 1 : 0,
			duration: bool ? 0.5 : 0.15,
			ease: bool ? 'elastic.out(1, .7)' : 'none',
			onComplete() {
				if (!bool) {
					gsap.set(elem, { display: 'none' })
				}
			},
		})
		gsap.to(elem, {
			'--clear-opacity': bool ? 1 : 0,
			duration: 0.15,
		})
	})

	/**
	 * methods段
	 * 清除动画
	 */
	function clickDel() {
		data.isClick = true
		let elem = clear.value!
		let tl = gsap.timeline()
		// 输入框失焦, 定位初始长度
		tl.set(elem, {
			'--clear-swipe-left': rData.inputWidthBefore,
			onStart() {
				msg.value!.input.blur()
			},
		})
			// 整体旋转
			.to(elem, {
				'--clear-rotate': '45deg',
				duration: 0.25,
			})
			// 箭头+竖线，箭头后移
			.to(elem, {
				'--clear-arrow-x': '2px',
				'--clear-arrow-y': '-2px',
				'--clear-arrow-offset': '0px',
				'--clear-arrow-offset-second': '8px',
				'--clear-line-array': '28.5px',
				'--clear-line-offset': '57px',
				'--clear-long-offset': '17px',
				duration: 0.25,
			})
			// 箭头前移
			.to(elem, {
				'--clear-arrow-x': '-4px',
				'--clear-arrow-y': '4px',
				'--clear-swipe': '-3px',
				duration: 0.15,
			})
			// 曲线化
			.to(
				rawD,
				{
					m: 3,
					x1: 4.88112,
					y1: 16.3819,
					x2: 8.202,
					y2: 19.8203,
					duration: 0.1,
				},
				'-=0.1',
			)
			// 整体移动
			.to(elem, {
				'--clear-swipe-x': 1,
				'--clear-x': rData.inputWidthLine,
				duration: 0.45,
			})
			// 箭头消失
			.to(
				elem,
				{
					'--clear-arrow-o': 0,
					'--clear-arrow-x': '0px',
					'--clear-arrow-y': '0px',
					'--clear-swipe': '0px',
					duration: 0.3,
				},
				'-=0.3',
			)
			// 直线化
			.to(
				rawD,
				{
					m: 2,
					x1: 10,
					y1: 10,
					x2: 14,
					y2: 14,
					ease: 'elastic.out(1, 0.75)',
					duration: 0.6,
				},
				'-=0.1',
			)
			// 复位
			.to(elem, {
				onStart() {
					msg.value!.input.focus()
					text.value = ''
				},
				'--clear-swipe-x': 0,
				'--clear-x': '0px',
				duration: 0.4,
				onComplete() {
					gsap.set(elem, {
						'--clear-rotate': '0deg',
						'--clear-arrow-o': 1,
						'--clear-arrow-offset': '4px',
						'--clear-arrow-offset-second': '4px',
						'--clear-line-array': '8.5px',
						'--clear-line-offset': '27px',
						'--clear-long-offset': '24px',
					})
					data.isClick = false
				},
			})
	}
</script>

<style scoped lang="scss">
	// 清除按钮，默认状态
	.clear {
		// 清除时箭头颜色
		--close-light: var(--stroke-hint-color);
		// 数值变量
		--clear-x: 0px;
		--clear-swipe-left: v-bind('rData.inputWidthBefore');
		--clear-swipe-x: 0;
		--clear-swipe: -3px;
		--clear-scale: 0;
		--clear-rotate: 0deg;
		--clear-opacity: 0;
		--clear-arrow-o: 1;
		--clear-arrow-x: 0px;
		--clear-arrow-y: 0px;
		--clear-arrow-offset: 4px;
		--clear-arrow-offset-second: 4px;
		--clear-line-array: 8.5px;
		--clear-line-offset: 27px;
		--clear-long-array: 8.5px;
		--clear-long-offset: 24px;

		// 默认值去除
		border: none;
		outline: none;
		padding: 0;
		// 显示属性
		display: none;
		position: relative;
		z-index: 1;
		// 自身属性
		margin: 12px 12px 12px 0;
		// 其他修饰
		background-color: transparent;
		opacity: var(--clear-opacity);
		transform: scale(var(--hover-scale, var(--clear-scale)));
		// 分别过渡
		transition: transform 0.3s
				cubic-bezier(0.12, 0.76, 0.71, 1.38),
			opacity 0.3s cubic-bezier(0.12, 0.76, 0.71, 1.38),
			background-color 0.3s;

		// 清除遮罩
		&:before {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			right: 12px;
			left: var(--clear-swipe-left);
			background: var(--component-background-color);
			transform-origin: 100% 50%;
			transform: translateX(var(--clear-swipe))
				scaleX(var(--clear-swipe-x)) translateZ(0);
		}

		// 触摸反馈
		&:hover {
			--hover-scale: 1.5;
			--hover-line-stroke: var(--font-hover-color);
			--clear-arrow-stroke: var(--font-hover-color);
		}

		&:active {
			--hover-scale: 1;
		}

		// 动画播放期间触摸移除
		&.clearing {
			pointer-events: none;
			--clear-arrow-stroke: var(--close-light);
		}

		// 线条相关
		svg {
			// 显示属性
			display: block;
			position: relative;
			z-index: 1;
			// 自身属性
			width: calc(var(--height) - 24px);
			height: calc(var(--height) - 24px);
			// 修饰属性
			outline: none;
			cursor: pointer;
			fill: none;
			// 全局SVG属性
			stroke-width: 1.5;
			stroke-linecap: round;
			stroke-linejoin: round;
			transform: translateX(var(--clear-x))
				rotate(var(--clear-rotate)) translateZ(0);
			// 单独属性
			path {
				transition: stroke 0.3s;
				&.arrow {
					stroke: var(
						--clear-arrow-stroke,
						var(--font-color)
					);
					stroke-dasharray: 4px;
					stroke-dashoffset: var(--clear-arrow-offset);
					opacity: var(--clear-arrow-o);
					transform: translate(
							var(--clear-arrow-x),
							var(--clear-arrow-y)
						)
						translateZ(0);

					&:last-child {
						stroke-dashoffset: var(
							--clear-arrow-offset-second
						);
					}
				}

				&.line {
					stroke: var(
						--hover-line-stroke,
						var(--font-color)
					);
					stroke-dasharray: var(--clear-line-array) 28.5px;
					stroke-dashoffset: var(--clear-line-offset);
				}

				&.long {
					stroke: var(
						--clear-arrow-stroke,
						var(--font-color)
					);
					stroke-dasharray: var(--clear-long-array) 15.5px;
					stroke-dashoffset: var(--clear-long-offset);
					opacity: var(--clear-arrow-o);
					transform: translate(
							var(--clear-arrow-x),
							var(--clear-arrow-y)
						)
						translateZ(0);
				}
			}
		}
	}
</style>
