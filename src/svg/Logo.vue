<!--
 * @Author: ChillyBlaze
 * @Date: 2022-05-25 19:05:16
 * @LastEditTime: 2022-09-16 15:01:05
 * @FilePath: /front-end/src/components/Logo/Logo.vue
 * @Description: 背景Logo和Welcome内容
-->
<template>
	<Transition :appear="true" @enter="enter">
		<div class="main">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				fill="none"
				version="1.1"
				viewBox="0 0 350 50"
			>
				<path
					d=" M33.8052,16.0326Q33.8052,24.4905,29.201,29.093Q24.5972,33.6957,16.1221,33.6957L12.5854,33.6957L12.5854,50L0,50L0,0L16.1221,0Q24.9475,0,29.3765,4.17801Q33.8052,8.33893,33.8052,16.0326Z
					M12.5854,22.7582L14.8795,22.7582Q17.7151,22.7582,19.3878,20.9918Q21.0605,19.2085,21.0605,16.0835Q21.0605,10.8356,15.8353,10.8356L12.5854,10.8356L12.5854,22.7582Z"
				/>
				<path
					d=" M91.0925,50L76.2131,50L71.7523,28.21Q71.4337,26.8343,70.7489,22.7751Q70.0638,18.699,69.7452,15.9647Q69.4904,18.1895,68.9166,21.5013Q68.3432,24.7961,67.7856,27.5645Q67.2281,30.3329,63.1497,50L48.2703,50L36.7365,0L48.8757,0L53.9417,25.0679Q55.6622,33.373,56.2994,38.2982Q56.7136,34.8166,57.7811,28.8383Q58.8486,22.843,59.7723,18.9029L63.8824,0L75.5438,0L79.5267,18.9029Q80.5463,23.4544,81.5976,29.4157Q82.6489,35.3601,82.9996,38.2982Q83.4137,34.5108,85.2618,25.1358L90.4233,0L102.563,0L91.0925,50Z "
				/>
				<path
					d=" M149.017,50L136.368,50L136.368,29.4836L121.743,29.4836L121.743,50L109.094,50L109.094,0L121.743,0L121.743,18.4782L136.368,18.4782L136.368,0L149.017,0L149.017,50Z "
				/>
				<path
					d=" M159.053,50L159.053,0L171.702,0L171.702,50L159.053,50Z "
				/>
				<path
					d=" M225.835,50L209.331,50L192.317,14.7758L192.03,14.7758Q192.635,23.0809,192.635,27.4626L192.635,50L181.484,50L181.484,0L197.924,0L214.875,34.7487L215.066,34.7487Q214.62,27.1909,214.62,22.6053L214.62,0L225.835,0L225.835,50Z "
				/>
				<path
					d=" M256.072,50L243.487,50L243.487,10.9715L232.112,10.9715L232.112,0L267.415,0L267.415,10.9715L256.072,10.9715L256.072,50Z "
				/>
				<path
					d=" M301.921,50L274.265,50L274.265,0L301.921,0L301.921,10.7677L286.85,10.7677L286.85,18.4782L300.806,18.4782L300.806,29.2459L286.85,29.2459L286.85,39.0625L301.921,39.0625L301.921,50Z "
				/>
				<path
					d=" M349.745,50L335.535,50L326.327,30.8763L322.599,33.271L322.599,50L309.95,50L309.95,0L322.599,0L322.599,21.7221Q323.555,19.7011,326.454,15.3194L336.236,0L350,0L335.312,22.4014L349.745,50Z"
				/>
			</svg>
			<div class="wave" v-show="show"></div>
		</div>
	</Transition>
</template>

<script setup lang="ts">
	import { fill } from '@/hooks/in-out'
	import gsap from 'gsap'
	import { ref } from 'vue'
	const show = ref(false)
	const enter = (el: Element, done: () => void) => {
		const list = el.querySelectorAll('path')
		list.forEach((s) => {
			gsap.set(s, {
				fill: 'transparent',
				strokeOpacity: 1,
				strokeDasharray: s.getTotalLength() + 10,
				strokeDashoffset: s.getTotalLength() + 10,
			})
			gsap.timeline()
				.delay(Math.random() * 3)
				.call(() => fill(s, '#d8d8d8', undefined, done))
		})
		gsap.timeline()
			.delay(5.5)
			.call(() => {
				show.value = true
			})
	}
</script>

<style scoped lang="scss">
	@import '@/assets/mixin.scss';
	.main {
		@include pagePara;
		width: 100%;
		position: relative;
		overflow: hidden;
		svg {
			path {
				stroke: black;
				stroke-width: 1px;
			}
		}
		.wave {
			&::before,
			&::after {
				content: '';
				position: absolute;
				top: 363vw;
				left: 50%;
				width: 700vw;
				height: 700vw;
				border-radius: 46% 48% 45% 47%;
				transform: translate(-50%, -50%);
				background: rgba(255, 169, 255, 0.85);
				animation: rotate 10s infinite linear;
				z-index: 1;
				mix-blend-mode: lighten;
			}

			&::after {
				border-radius: 47% 47% 46% 46%;
				animation: rotate 7s infinite 0.5s linear;
			}
		}
		@keyframes rotate {
			0% {
				transform: translate(-50%, -50%) rotate(0);
			}
			100% {
				transform: translate(-50%, -50%) rotate(360deg);
			}
		}
	}
</style>
