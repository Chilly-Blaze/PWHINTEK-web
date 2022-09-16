/*
 * @Author: ChillyBlaze
 * @Date: 2022-05-11 21:50:46
 * @LastEditTime: 2022-09-15 16:56:18
 * @FilePath: /front-end/src/hooks/in-out.ts
 * @Description: 统一动画封装
 */

import { onBeforeUnmount, onMounted } from 'vue'
import gsap from 'gsap'

const fill = (e: Element, c: string, n = 0, done?: () => void) => {
	gsap.timeline()
		.to(e, {
			strokeDashoffset: n,
			'--stroke-width': '0.5px',
			duration: 3,
			ease: 'power2.inOut',
		})
		.delay(0.2)
		.set(e, {
			fill: '#fff',
		})
		.to(e, {
			fill: c,
			strokeOpacity: 0,
			duration: 0.5,
			onComplete: done,
		})
}
const broken = (e: Element, done?: () => void) => {
	gsap.timeline()
		.to(e, {
			'--stroke-width': '0.5px',
			strokeDashoffset: 0,
			duration: 3,
			ease: 'power2.inOut',
		})
		.set(e, {
			strokeDasharray: '50 0',
		})
		.to(e, {
			strokeDasharray: '50 5',
			duration: 1,
			ease: 'power3.inOut',
			onComplete: done,
		})
}

function enterFS(s: Element, f: Element, n: number, done: () => void) {
	fill(f, '#ffccff', n)
	broken(s, done)
}

function leaveFS(s: Element, f: Element, done: () => void) {
	gsap.timeline()
		.to(f, {
			fill: 'transparent',
			strokeOpacity: 1,
			duration: 0.5,
		})
		.to(f, {
			strokeOpacity: 0,
			duration: 0.5,
			onComplete: done,
		})
	gsap.timeline()
		.to(s, {
			strokeDasharray: '50 0',
			duration: 0.5,
		})
		.to(s, {
			strokeOpacity: 0,
			duration: 0.5,
		})
}

export { enterFS, leaveFS, fill, broken }
