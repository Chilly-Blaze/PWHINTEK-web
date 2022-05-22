<template>
	<PInputTemp
		:width="240"
		:height="48"
		:msg="props.msg"
		:isCorrect="props.isCorrect"
		ref="msg"
		v-model="text"
		@mousemove="handleMousemove"
		@mouseleave="handleMouseleave"
	>
		<template #feature>
			<button ref="clear" class="clear" @click="switchType">
				<svg viewBox="0 0 21 21">
					<circle
						class="eye"
						cx="10.5"
						cy="10.5"
						r="2.25"
					/>
					<path class="top" :d="d" />
					<path
						class="bottom"
						d="M2 10.5C2 10.5 6.43686 15.5 10.5 15.5C14.5631 15.5 19 10.5 19 10.5"
					/>
					<g class="lashes">
						<path d="M10.5 15.5V18" />
						<path d="M14.5 14.5L15.25 17" />
						<path d="M6.5 14.5L5.75 17" />
						<path d="M3.5 12.5L2 15" />
						<path d="M17.5 12.5L19 15" />
					</g>
				</svg>
			</button>
		</template>
	</PInputTemp>
</template>

<script setup lang="ts">
	import { PInputTemp } from '..'
	import {
		reactive,
		watch,
		computed,
		ref,
		readonly,
		onMounted,
	} from 'vue'
	import gsap from 'gsap'

	/**
	 * props段
	 * 接收外部传入宽高和placeholder，v-model
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
			msg: 'Password',
		},
	)

	/**
	 * data段
	 * 获取全局唯一button按钮dom内容，防止gsap动画串台
	 */
	let clear = ref<HTMLButtonElement>()

	/**
	 * data段
	 * 存储文本信息，同步父组件v-model
	 */
	let text = ref('')
	watch(
		() => props.modelValue,
		(val) => {
			text.value = val || ''
		},
	)
	const emit = defineEmits(['update:modelValue'])
	watch(text, (val) => {
		emit('update:modelValue', val)
	})

	/**
	 * data段
	 * 存储眼球位置参数
	 */
	const eyeLocation = reactive({
		// 标记眼球位置
		x: 0,
		y: 0,
	})

	/**
	 * data段
	 * 5.5表示上半弧，15.5表示下半弧
	 */
	const rawD = ref(5.5)
	/**
	 * computed段
	 * 计算d
	 */
	const d = computed(() => {
		return `M2 10.5C2 10.5 6.43686 ${rawD.value} 10.5 ${rawD.value}C14.5631 ${rawD.value} 19 10.5 19 10.5`
	})

	/**
	 * readonly段
	 * 一些计算参数
	 */
	const rawData = readonly({
		inputWidthBefore: -props.width + props.height + 5 + 'px',
		inputWidth: props.width - props.height,
		maxXOffset: (props.height - 24) / 16,
		halfSVG: props.height / 2,
	})

	interface exposeData {
		input: HTMLInputElement
	}
	/**
	 * data段
	 * 接收子组件的input dom用于聚焦和失焦
	 * 默认undefined，子组件加载完成之后会被赋值
	 */
	let msg = ref<exposeData>()
	onMounted(() => {
		msg.value!.input.type = 'password'
	})

	/**
	 * methods段
	 * 用于监视鼠标在输入框内移动位置，设置眼珠看向指定位置
	 */
	function handleMousemove(e: MouseEvent) {
		let node = e.target as HTMLElement
		if (node.nodeName === 'INPUT') {
			eyeLocation.x =
				e.offsetX / rawData.inputWidth -
				1 -
				rawData.maxXOffset
		} else if (node.nodeName === 'BUTTON') {
			eyeLocation.x =
				(e.offsetX / rawData.halfSVG - 1) * rawData.maxXOffset
		}
		eyeLocation.y =
			(1 - e.offsetY / rawData.halfSVG) *
			rawData.maxXOffset *
			(Math.abs(eyeLocation.x) / 3 - 1)
	}
	/**
	 * methods段
	 * 设置眼珠初始值
	 */
	function handleMouseleave() {
		eyeLocation.x = 0
		eyeLocation.y = 0
	}
	/**
	 * methods段
	 * 切换输入框类型
	 */
	function switchType() {
		let v = clear.value!
		let type = msg.value?.input.type
		if (type === 'password') {
			gsap.timeline()
				.to(v, {
					'--eye-s': 0,
					'--eye-background': 0,
					duration: 0.2,
				})
				.to(
					rawD,
					{
						value: 15.5,
						duration: 0.5,
					},
					'-=0.08',
				)
				.to(v, {
					'--eye-offset': '0px',
					duration: 0.1,
					onComplete() {
						msg.value!.input.type = 'text'
					},
				})
			gsap.to(v, {
				'--clear-swipe-top': 1,
				duration: 1.5,
				ease: 'slow(0.5, 0.7, false)',
			})
			gsap.delayedCall(1.0, () => {
				msg.value?.input.focus()
			})
		} else {
			gsap.timeline()
				.to(v, {
					'--eye-offset': '3px',
					duration: 0.1,
				})
				.to(v, {
					'--eye-s': 1,
					'--eye-background': 0,
					'--eye-offset': '3px',
					duration: 0.2,
				})
				.to(
					rawD,
					{
						value: 5.5,
						duration: 0.5,
						onComplete() {
							msg.value!.input.type = 'password'
						},
					},
					'-=0.1',
				)
			gsap.to(v, {
				'--clear-swipe-top': -1,
				duration: 1.5,
				ease: 'slow(0.5, 0.7, false)',
				delay: 0.1,
				onComplete() {
					msg.value?.input.focus()
				},
			})
			gsap.delayedCall(1.0, () => {
				msg.value?.input.focus()
			})
		}
	}

	/**
	 * watch段
	 * 用于监视data.eyeX/Y变化，设置眼珠看向指定位置
	 */
	watch(eyeLocation, (newValue) => {
		const currentX = newValue.x + 'px'
		const currentY = newValue.y + 'px'
		gsap.set('.clear', {
			'--eye-x': currentX,
			'--eye-y': currentY,
		})
	})
</script>

<style scoped lang="scss">
	.clear {
		--clear-swipe-top: -1;
		--clear-swipe-left: v-bind('rawData.inputWidthBefore');
		--eye-background: 0;
		--eye-offset: 3px;
		--eye-y: 0;
		--eye-x: 0;
		--eye-s: 1;
		-webkit-appearance: none;
		outline: none;
		background: none;
		border: none;
		margin: 0;
		-webkit-tap-highlight-color: transparent;
		cursor: pointer;
		padding: 12px;
		position: relative;
		z-index: 1;
		transform: scale(var(--s, 1));
		color: var(--font-color);
		transition: color 0.25s, transform 0.15s;
		// 转换遮罩
		&:before {
			// display: none;
			content: '';
			position: absolute;
			top: calc(var(--height) * var(--clear-swipe-top));
			bottom: 0;
			right: var(--height);
			left: var(--clear-swipe-left);
			height: var(--height);
			background: var(--component-background-color);
		}
		&:hover {
			--s: 1.2;
			color: var(--font-hover-color);
		}
		&:active {
			--s: 0.9;
		}
		svg {
			display: block;
			width: calc(var(--height) - 24px);
			height: calc(var(--height) - 24px);
			pointer-events: none;
			.top,
			.bottom,
			.lashes {
				fill: none;
				stroke: currentColor;
				stroke-width: 1.5px;
				stroke-linecap: round;
			}
			.lashes {
				stroke-dasharray: 3px;
				stroke-dashoffset: var(--eye-offset);
			}
			.top {
				fill: var(--component-background-color);
				fill-opacity: var(--eye-background);
			}
			.eye {
				fill: currentColor;
				transform-origin: 10.5px 13.5px;
				transform: translate(var(--eye-x), var(--eye-y))
					scale(var(--eye-s)) translateZ(0);
				transition: transform var(--eye-duration, 0.3s);
			}
		}
	}
</style>
