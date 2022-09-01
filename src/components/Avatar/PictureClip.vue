<!--
 * @Author: ChillyBlaze
 * @Date: 2022-08-15 22:51:08
 * @LastEditTime: 2022-08-31 22:04:50
 * @FilePath: /front-end/src/components/Card/PictureClip.vue
 * @Description: 图片裁切卡片
 * Copyright (c) 2022 by ChillyBlaze l135163642@gmail.com, All Rights Reserved. 
-->
<template>
	<teleport to="body">
		<div class="bgfilter">
			<div class="clip-card">
				<div class="constituency">
					<VueCropper
						ref="cropper"
						:img="props.src"
						:autoCrop="true"
						:fixed="true"
						:centerBox="true"
						@realTime="preview"
					></VueCropper>
				</div>
				<img alt="avatar" ref="img" class="preview" />
				<PCButton class="confirm" @click="confirm">确认</PCButton>
				<PCButton class="quit" @click="emits('done')">退出</PCButton>
			</div>
		</div>
	</teleport>
</template>

<script setup lang="ts">
	import 'vue-cropper/dist/index.css'
	import { VueCropper } from 'vue-cropper'
	import { PCButton } from '..'
	import { onMounted, reactive, ref } from 'vue'
	// 确认按钮返回formdata并触发data事件，完成后触发退出事件
	const emits = defineEmits(['data', 'done'])
	// 接收本地图片路径src
	const props = defineProps<{
		src: string
	}>()
	const cropper = ref()
	const img = ref<HTMLImageElement>()
	const preview = () => {
		cropper.value.getCropData((data: any) => {
			img.value!.src = data
		})
	}
	const confirm = () => {
		cropper.value.getCropBlob((blob: Blob) => {
			const formData = new FormData()
			formData.append('file', blob)
			emits('data', formData)
			emits('done')
		})
	}
</script>

<style lang="scss" scoped>
	@import '@/assets/mixin.scss';
	.bgfilter {
		@include pagePara;
		min-height: 100vh;
		min-width: 100vw;
		display: flex;
		align-items: center;
		justify-content: center;
		backdrop-filter: blur(8px);
		.clip-card {
			max-width: 90%;
			max-height: 90%;
			box-shadow: var(--component-thick-shadow);
			background-color: var(--component-background-color);
			border-radius: 3px;
			display: grid;
			grid-template-areas:
				'a a a b b b b .'
				'a a a b b b b .'
				'a a a c c d d .'
				'a a a c c d d .';
			justify-items: center;
			align-items: center;
			column-gap: 20px;
			.constituency {
				grid-area: a;
				width: 400px;
				height: 400px;
			}
			.preview {
				grid-area: b;
				width: 200px;
				height: 200px;
				border-radius: 100%;
				overflow: hidden;
			}
			.confirm {
				grid-area: c;
			}
			.quit {
				grid-area: d;
			}
		}
	}
</style>
