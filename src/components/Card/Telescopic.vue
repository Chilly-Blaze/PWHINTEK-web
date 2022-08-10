<!--
 * @Author: ChillyBlaze
 * @Date: 2022-08-01 11:46:55
 * @LastEditTime: 2022-08-10 12:47:55
 * @FilePath: /front-end/src/components/Card/Telescopic.vue
 * @Description: 伸缩卡片
 * Copyright (c) 2022 by ChillyBlaze l135163642@gmail.com, All Rights Reserved. 
-->
<template>
	<div
		class="main"
		ref="main"
		@touchmove="show()"
		@mouseenter="show(true)"
		@mouseleave="show(false)"
	>
		<div class="title" ref="title">
			<slot name="tit">这是标题</slot>
		</div>
		<div class="hidden" ref="hide">
			<slot name="description">这是内容</slot>
		</div>
		<svg class="hint">
			<line ref="line" x1="15" y1="0" :x2="title?.offsetWidth" y2="0" />
		</svg>
	</div>
</template>

<script setup lang="ts">
	import gsap from 'gsap'
	import { onMounted, reactive, ref } from 'vue'

	let hide = ref<HTMLDivElement>()
	let main = ref<HTMLDivElement>()
	let title = ref<HTMLDivElement>()
	let line = ref<SVGLineElement>()
	let data = reactive({
		show: false,
	})

	let show = (sh = !data.show) => {
		data.show = sh
		let h,
			ht = title.value!.offsetHeight,
			hh = hide.value!.offsetHeight,
			w = title.value!.offsetWidth,
			s = 1,
			r = 24
		data.show
			? ((h = ht + hh + 36), (s = 1.1), (r = 15), (w = 0))
			: (h = ht + 24)
		gsap.to(main.value!, {
			height: h,
			scale: s,
			borderRadius: r,
			duration: 0.5,
		})
		gsap.to(line.value!, {
			strokeDashoffset: w,
			duration: 0.2,
		})
	}
	onMounted(() => {
		main.value!.style.height = title.value!.offsetHeight + 24 + 'px'
	})
</script>

<style lang="scss" scoped>
	@import '@/assets/mixin.scss';
	.main {
		@include pagePara;
		position: relative;
		margin: 1em;
		width: 100%;
		border-radius: 24px;
		transition: ease-in-out;
		overflow: hidden;
		cursor: pointer;
		box-shadow: var(--component-light-shadow);
		.title {
			font-size: x-large;
			font-weight: bold;
			margin: 12px;
		}
		.hidden {
			height: auto;
			margin: 12px;
		}
		.hint {
			// 默认值去除
			user-select: none;
			pointer-events: none;
			// 显示属性
			position: absolute;
			height: 10px;
			top: v-bind('title?.offsetHeight + 18 + "px" || "0px"');
			width: v-bind('title?.offsetWidth + "px" || "0px"');
			z-index: 1;
			line {
				stroke-width: 4px;
				stroke-linecap: round;
				stroke-linejoin: round;
				stroke-dashoffset: v-bind('title?.offsetWidth + "px" || "0px"');
				stroke-dasharray: v-bind('title?.offsetWidth + "px" || "0px"');
				transition: all 0.5s ease-in-out;
				stroke: var(--stroke-hint-color);
			}
		}
	}
</style>
