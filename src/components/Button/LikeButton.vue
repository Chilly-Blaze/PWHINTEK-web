<!--
 * @Author: ChillyBlaze
 * @Date: 2022-08-03 09:54:52
 * @LastEditTime: 2022-08-10 11:25:58
 * @FilePath: /front-end/src/components/Button/LikeButton.vue
 * @Description: 点赞按钮
 * Copyright (c) 2022 by ChillyBlaze l135163642@gmail.com, All Rights Reserved. 
-->
<template>
	<button
		class="button-star"
		ref="button"
		:class="{ active: data.isActive }"
		@mouseenter="hover"
		@mouseleave="leave"
		@click="click"
	>
		<canvas ref="canvas"></canvas>
		<div class="label">
			<span class="default">Like<span class="success">d</span></span>
		</div>
		<div class="number">
			<span class="current">{{ cNum }}</span>
			<span class="new">{{
				typeof cNum == 'number' ? cNum + 1 : cNum
			}}</span>
			<div class="add">+1</div>
		</div>
	</button>
</template>

<script setup lang="ts">
	import * as THREE from 'three'
	// 加载器引入
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
	import { computed, onMounted, reactive, ref } from 'vue'
	import { gsap } from 'gsap'
	// gsap插件引入/注册
	import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
	gsap.registerPlugin(MotionPathPlugin)

	// 传入参数
	const props = defineProps<{
		num: number
	}>()
	const cNum = computed(() => {
		const div = (n: number, d: number) => {
			return Math.round((n * 10) / d) / 10
		}
		const num = props.num
		if (num <= 999) return num
		else if (num <= 9999) return div(num, 1000) + 'k'
		else if (num <= 99999) return div(num, 10000) + 'w'
		else if (num <= 999999) return div(num, 100000) + 'm'
		else return '∞'
	})

	// DOM元素获取
	const button = ref<HTMLButtonElement>()
	const canvas = ref<HTMLCanvasElement>()
	const star = ref<THREE.Group>()
	const light = ref<THREE.AmbientLight>()

	// 挂载后获取canvas DOM渲染3D星星
	onMounted(() => {
		/**
		 * 在s的指定位置xyz设定强度为i的点光源
		 */
		const addLight = (
			x: number,
			y: number,
			z: number,
			i: number,
			s: THREE.Scene,
		) => {
			const light = new THREE.PointLight(0xffffff, i)
			light.position.set(x, y, z)
			s.add(light)
		}
		const width = 400
		const height = 206
		const renderer = new THREE.WebGLRenderer({
			// 指定canvas
			canvas: canvas.value!,
			// 附加到已有渲染环境，背景透明
			context: canvas.value!.getContext('webgl2')!,
			// 抗锯齿
			antialias: true,
		})
		// 画布大小
		renderer.setSize(width, height)
		// 设置像素比，避免绘制模糊
		renderer.setPixelRatio(5)
		// 场景
		const scene = new THREE.Scene()
		// 摄像机
		const camera = new THREE.PerspectiveCamera(45, width / height, 4, 100)
		camera.position.set(0, 0, 30)
		// 点光源和环境光
		addLight(5, 0, 1, 0.4, scene)
		addLight(-5, 0, 1, 0.4, scene)
		addLight(0, 3, 6, 0.3, scene)
		addLight(0, 2, 0, 0.5, scene)
		let l = new THREE.AmbientLight(0xffffff, 0.8)
		light.value = l
		scene.add(l)
		// 已有glb素材加载
		const loader = new GLTFLoader()
		loader.load('/star-default.glb', function (data) {
			// glb文件加载完成之后回调函数，参数为加载完的GLTF对象
			// 获得星星对象，添加进场景
			star.value = data.scene
			scene.add(data.scene)
		})
		const render = () => {
			requestAnimationFrame(render)
			renderer.render(scene, camera)
		}
		render()
	})

	// 动画部分
	const data = reactive({
		isActive: false,
		starRotate: undefined as undefined | gsap.core.Tween,
		starScale: undefined as undefined | gsap.core.Tween,
	})
	/**
	 * 聚焦动画
	 */
	const hover = () => {
		if (data.isActive) return
		// 大小缩放
		data.starScale = gsap.to(button.value!, {
			onStart() {
				light.value!.intensity = 1.0
				// 去除灰度和偏色
				gsap.to(button.value!, {
					'--button-star-greyscale': '0%',
					'--button-star-hue': '225deg',
					'--button-star-opacity': 1,
					duration: 0.15,
				})
			},
			'--button-star-scale': 1,
			ease: 'elastic.out(1, .75)',
			duration: 0.5,
		})
		data.starRotate = gsap.to(star.value!.rotation, {
			duration: 1.5,
			y: THREE.MathUtils.degToRad(360),
			ease: 'none',
			repeat: -1,
		})
	}
	/**
	 * 离开动画
	 */
	const leave = () => {
		if (data.isActive) return
		data.starRotate?.kill()
		data.starScale?.kill()
		gsap.to(star.value!.rotation, {
			duration: 0.3,
			y: THREE.MathUtils.degToRad(0),
		})
		gsap.to(button.value!, {
			'--button-star-scale': 0.75,
			'--button-star-greyscale': '85%',
			'--button-star-hue': '170deg',
			'--button-star-opacity': 0.6,
			duration: 0.2,
			onComplete() {
				light.value!.intensity = 0.9
			},
		})
	}
	/**
	 * 单击动画
	 */
	const click = () => {
		data.isActive = !data.isActive
		gsap.set(button.value!, { pointerEvents: 'none' })
		if (data.isActive) {
			// 路径动画
			gsap.timeline()
				.to(star.value!.position, {
					duration: 0.7,
					motionPath: {
						path: [
							{
								x: 0,
								y: -0.5,
							},
							{
								x: 5.45,
								y: -5,
							},
							{
								x: 10.9,
								y: -0.5,
							},
							{
								x: 7,
								y: 7,
							},
						],
						curviness: 1.2,
					},
					ease: 'sine.in',
				})
				.to(
					star.value!.rotation,
					{
						duration: 0.4,
						y: THREE.MathUtils.degToRad(0),
					},
					0,
				)

			gsap.timeline()
				.to(button.value!, {
					// 放大变色
					'--button-star-scale': 1,
					'--button-star-greyscale': '0%',
					'--button-star-hue': '230deg',
					'--button-star-opacity': 1,
					duration: 0.15,
				})
				.to(
					button.value!,
					{
						// 文字信息变化
						'--button-label-x': '0px',
						'--button-label-success-opacity': 1,
						duration: 0.25,
					},
					0.2,
				)
				.to(
					button.value!,
					{
						// 数字信息变化
						'--button-star-current-opacity': 0,
						'--button-star-current-y': '-16px',
						'--button-star-new-opacity': 1,
						'--button-star-new-y': '0px',
						'--button-star-add-opacity': 1,
						'--button-star-add-y': '-8px',
						duration: 0.25,
					},
					0.5,
				)
				.to(
					button.value!,
					{
						// +1消失
						'--button-star-add-opacity': 0,
						duration: 0.2,
					},
					0.75,
				)
				.to(
					button.value!,
					{
						// 星星消失
						'--button-star-opacity': 0,
						duration: 0.1,
					},
					0.6,
				)
				.set(button.value!, {
					'--button-star-scale': 0.75,
					'--button-star-greyscale': '85%',
					'--button-star-hue': '170deg',
					pointerEvents: 'auto',
				})
				.set(star.value!.position, {
					x: 0,
					y: 0,
				})
		} else {
			gsap.timeline()
				.to(button.value!, {
					'--button-label-x': '24px',
					'--button-label-success-opacity': 0,
					'--button-star-opacity': 0.45,
					'--button-star-current-opacity': 1,
					'--button-star-current-y': '0px',
					'--button-star-new-opacity': 0,
					'--button-star-new-y': '16px',
					duration: 0.25,
					clearProps: true,
				})
				.set(button.value!, {
					pointerEvents: 'auto',
				})
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/assets/mixin.scss';
	.button-star {
		@include pagePara;
		--button-label-x: 18px;
		--button-label-success-opacity: 0;
		--button-star-scale: 0.75;
		--button-star-greyscale: 85%;
		--button-star-hue: 170deg;
		--button-star-opacity: 0.6;
		--button-star-add-opacity: 0;
		--button-star-add-y: 16px;
		--button-star-current-opacity: 1;
		--button-star-current-y: 0px;
		--button-star-new-opacity: 0;
		--button-star-new-y: 16px;

		appearance: none;
		border: none;
		cursor: pointer;
		background-color: var(--component-background-color);
		color: var(--font-color);
		border-radius: 13px;
		outline: none;
		margin: 0;
		padding: 0;
		font-size: 14px;
		font-weight: 600;
		line-height: 20px;
		position: relative;
		text-align: center;
		display: flex;
		box-shadow: var(--component-light-shadow);
		transition: transform 0.15s;
		transform: translateZ(0);

		&:active {
			transform: scale(0.9, 0.9) translateZ(0);
		}

		canvas {
			display: block;
			width: 400px;
			height: 200px;
			position: absolute;
			z-index: 1;
			left: -176px;
			top: -84px;
			pointer-events: none;
			filter: Grayscale(var(--button-star-greyscale))
				hue-rotate(var(--button-star-hue));
			transform: scale(var(--button-star-scale));
			transform-origin: 50% 52%;
			opacity: var(--button-star-opacity);
		}

		.label {
			width: 90px;
			padding: 10px 0;
			transform: translateZ(0);

			.default {
				display: block;
				transform: translateX(var(--button-label-x));
				.success {
					opacity: var(--button-label-success-opacity);
				}
			}
		}

		.number {
			padding: 10px 0;
			width: 44px;
			position: relative;
			transform: translateZ(0);

			&:before {
				content: '';
				position: absolute;
				left: -3px;
				top: 5px;
				opacity: 0.5;
				bottom: 5px;
				width: 2px;
				background-color: var(--stroke-hint-color);
			}

			.current {
				color: var(--font-color);
				opacity: var(--button-star-current-opacity);
				transform: translateY(var(--button-star-current-y));
				transition: color 0.2s;
				display: block;
			}

			.new {
				opacity: var(--button-star-new-opacity);
				transform: translateY(var(--button-star-new-y));
				color: var(--font-identified-color);
				position: absolute;
				top: 10px;
				left: 0;
				right: 0;
				display: block;
			}

			.add {
				position: absolute;
				bottom: 100%;
				left: 0;
				right: 0;
				opacity: var(--button-star-add-opacity);
				transform: translateY(var(--button-star-add-y));
				pointer-events: none;
				color: var(--font-hint-color);
				display: block;
			}
		}
	}
</style>
