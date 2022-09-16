<!--
 * @Author: ChillyBlaze
 * @Date: 2022-09-01 10:42:05
 * @LastEditTime: 2022-09-13 19:44:53
 * @FilePath: /front-end/src/components/Avatar/Easy.vue
 * @Description: 头像组件基本模板
 * Copyright (c) 2022 by ChillyBlaze l135163642@gmail.com, All Rights Reserved. 
-->

<template>
	<div class="frame">
		<img ref="img" />
		<slot name="feature"></slot>
	</div>
</template>

<script setup lang="ts">
	import { rGetAvatar } from '@/api'
	import { onMounted, ref, watch } from 'vue'

	const props = defineProps<{
		filename: string
		d: number
	}>()
	const img = ref<HTMLImageElement>()
	onMounted(() => {
		img.value!.src = rGetAvatar(props.filename)
		img.value!.onerror = () => (img.value!.src = rGetAvatar('default.png'))
	})
	watch(
		() => props.filename,
		() => {
			img.value!.src = rGetAvatar(props.filename)
		},
	)
</script>

<style lang="scss" scoped>
	@import '@/assets/mixin.scss';
	.frame {
		@include pagePara;
		width: v-bind("props.d+'px'");
		height: v-bind("props.d+'px'");
		position: relative;
		cursor: pointer;
		border-radius: 100%;
		overflow: hidden;
		transition: var(--click-transition);
		img {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			pointer-events: none;
			z-index: -1;
		}
		&:hover {
			scale: 1.1;
			transition: var(--click-transition);
		}
		&:active {
			scale: 0.9;
			transition: var(--click-transition);
		}
	}
</style>
