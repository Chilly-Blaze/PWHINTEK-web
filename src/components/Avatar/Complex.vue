<!--
 * @Author: ChillyBlaze
 * @Date: 2022-08-31 09:30:33
 * @LastEditTime: 2022-09-04 15:19:55
 * @FilePath: /front-end/src/components/Avatar/Complex.vue
 * @Description: 头像框按钮更改头像
 * Copyright (c) 2022 by ChillyBlaze l135163642@gmail.com, All Rights Reserved. 
-->

<template>
	<PEAvatar
		:filename="store.info?.avatar || 'default.png'"
		@click="selectFile"
		@mouseenter="hover"
		@mouseleave="reduction"
	>
		<template #feature>
			<div class="hint" ref="hint" v-if="lazyRender" />
			<div class="camera" ref="camera">
				<Camera />
			</div>
		</template>
	</PEAvatar>
	<PictureClip
		v-if="display"
		:src="clipSrc"
		@data="sendAva"
		@done="display = false"
	/>
</template>

<script setup lang="ts">
	import { rUpdAvatar } from '@/api'
	import { computed, onMounted, reactive, ref } from 'vue'
	import PictureClip from './PictureClip.vue'
	import { PMessage, PEAvatar } from '@/components'
	import { useUserInfoStore } from '@/stores/userInfo'
	import gsap from 'gsap'
	import CustomEase from 'gsap/CustomEase'
	import Camera from '@/svg/Camera.vue'
	gsap.registerPlugin(CustomEase)
	const store = useUserInfoStore()
	const display = ref(false)
	const clipSrc = ref<string>()
	const hint = ref<HTMLDivElement>()
	const camera = ref<HTMLDivElement>()
	const lazyRender = ref(false)
	onMounted(() => {
		lazyRender.value = true
	})
	// 携带clip返回结果更新头像
	const sendAva = async (data: FormData) => {
		try {
			const info = await rUpdAvatar(data)
			PMessage.success('更新成功')
			if (store.info) store.info.avatar = info.data.data
		} catch (err: any) {}
	}
	// 选取上传源文件
	const selectFile = () => {
		const inputElement = document.createElement('input')
		inputElement.setAttribute('type', 'file')
		inputElement.setAttribute('accept', 'image/*')
		inputElement.click()
		inputElement.onchange = () => {
			if (inputElement.files !== null) {
				const file = inputElement.files[0]
				clipSrc.value = URL.createObjectURL(file)
				display.value = true
			}
		}
	}
	// 触摸和还原动画
	const hover = () => {
		gsap.timeline()
			.to(hint.value!, {
				'--radius': '50%',
				duration: 0.3,
			})
			.to(hint.value!, {
				delay: 0.2,
				'--radius': '100%',
				duration: 0.3,
			})
		gsap.to(hint.value!, {
			top: '0%',
			duration: 0.8,
			ease: CustomEase.create(
				'custom',
				'M0,0,C0,0,0.069,0.123,0.12,0.193,0.16,0.248,0.19,0.281,0.24,0.327,0.275,0.361,0.302,0.378,0.345,0.405,0.494,0.501,0.587,0.548,0.735,0.643,0.778,0.671,0.805,0.691,0.84,0.727,0.878,0.766,0.902,0.797,0.93,0.845,0.961,0.899,1,1,1,1',
			),
		})
		gsap.to(camera.value!, {
			top: '50%',
			translateY: '-50%',
			duration: 1,
		})
	}
	const reduction = () => {
		gsap.set(hint.value!, {
			'--radius': '0%',
		})
		gsap.to(hint.value!, {
			top: '100%',
			duration: 1,
		})
		gsap.to(camera.value!, {
			top: '100%',
			translateY: '0%',
			duration: 1,
		})
	}
</script>

<style scoped lang="scss">
	@import '@/assets/mixin.scss';
	.hint {
		--radius: 50%;
		top: 100%;
		width: 100%;
		height: 100%;
		cursor: pointer;
		pointer-events: none;
		position: absolute;
		border-radius: var(--radius) / 25%;
		background-color: var(--component-vague-filter);
		backdrop-filter: blur(4px);
	}
	.camera {
		width: 40%;
		height: 40%;
		top: 100%;
		left: 0;
		right: 0;
		margin: auto;
		transform: translateY(0%);
		position: absolute;
	}
</style>
