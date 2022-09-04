/*
 * @Author: ChillyBlaze
 * @Date: 2022-05-11 21:50:46
 * @LastEditTime: 2022-05-15 17:05:40
 * @FilePath: /front-end/src/views/Login/hooks/in-out.ts
 * @Description: 统一动画封装
 */

import { onBeforeUnmount, onMounted } from 'vue'
import gsap from 'gsap'

function enterFS(
	s: Element,
	f: Element,
	n: number,
	done: () => void,
) {
	gsap.timeline()
		.to(f, {
			strokeDashoffset: n,
			'--stroke-width': '0.5px',
			duration: 3,
			ease: 'power2.inOut',
		})
		.delay(0.2)
		.set(f, {
			fill: '#fff',
		})
		.to(f, {
			fill: '#ffccff',
			strokeOpacity: 0,
			duration: 0.5,
		})
	gsap.timeline()
		.to(s, {
			'--stroke-width': '0.5px',
			strokeDashoffset: 0,
			duration: 3,
			ease: 'power2.inOut',
		})
		.set(s, {
			strokeDasharray: '50 0',
		})
		.to(s, {
			strokeDasharray: '50 5',
			duration: 1,
			ease: 'power3.inOut',
			onComplete: done,
		})
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
	const stroke = '#ani-login-stroke'
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

export { enterFS, leaveFS }
