<!--
 * @Author: ChillyBlaze
 * @Date: 2022-08-31 09:30:33
 * @LastEditTime: 2022-09-01 11:21:59
 * @FilePath: /front-end/src/components/Avatar/Complex.vue
 * @Description: 头像框按钮更改头像
 * Copyright (c) 2022 by ChillyBlaze l135163642@gmail.com, All Rights Reserved. 
-->

<template>
	<PEAvatar>
		<template #feature>
			<div class="hint">
				<div class="filter" />
				太难看了!
			</div>
		</template>
	</PEAvatar>
	<PictureClip
		v-if="display"
		src="/img/image1.jpeg"
		@data="sendAva"
		@done="display = false"
	/>
</template>

<script setup lang="ts">
	import { rUpdAvatar } from '@/api'
	import { reactive, ref } from 'vue'
	import PictureClip from './PictureClip.vue'
	import { PMessage, PEAvatar } from '@/components'
	import gsap from 'gsap'
	const display = ref(false)
	// 携带clip返回结果更新头像
	// TODO:拆解圆形头像框为单独组件暴露点击接口，针对自己头像可以修改，他人头像点击进入详情
	const sendAva = async (data: FormData) => {
		try {
			await rUpdAvatar(data)
			PMessage.success('更新成功')
		} catch (err: any) {}
	}
	// TODO:触摸和单击动画
	const hover = () => {}
</script>

<style scoped lang="scss">
	@import '@/assets/mixin.scss';
	.hint {
		--radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 60%;
		width: 100%;
		position: absolute;
		overflow: hidden;
		border-radius: var(--radius) / 25%;
		bottom: 0px;
		backdrop-filter: blur(10px);
		.filter {
			width: 100%;
			height: 100%;
			position: absolute;
			background-color: var(--font-hover-color);
			filter: opacity(0.3);
			z-index: -1;
		}
	}
</style>
