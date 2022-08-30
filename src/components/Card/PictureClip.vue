<!--
 * @Author: ChillyBlaze
 * @Date: 2022-08-15 22:51:08
 * @LastEditTime: 2022-08-30 21:32:36
 * @FilePath: /front-end/src/components/Card/PictureClip.vue
 * @Description: 图片裁切卡片
 * Copyright (c) 2022 by ChillyBlaze l135163642@gmail.com, All Rights Reserved. 
-->
<template>
	<div class="bgfilter">
		<div class="main">
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
			<div class="preview">
				<img alt="avatar" ref="img" />
			</div>
			<PCButton class="confirm" @click="confirm">确认</PCButton>
			<PCButton class="quit" @click="quit">退出</PCButton>
		</div>
	</div>
</template>

<script setup lang="ts">
	import 'vue-cropper/dist/index.css'
	import { VueCropper } from 'vue-cropper'
	import { PCButton } from '..'
	import { onMounted, reactive, ref } from 'vue'
	const emits = defineEmits(['bytes', 'close'])
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
		cropper.value.getCropBlob((data: Blob) => {
			emits('bytes', data)
			emits('close')
		})
	}
	const quit = () => {
		emits('close')
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
		.main {
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
				border: solid black 1px;
				border-radius: 100%;
				overflow: hidden;
				img {
					width: 100%;
					height: 100%;
				}
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
