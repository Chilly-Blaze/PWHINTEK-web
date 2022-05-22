<!--
 * @Author: ChillyBlaze
 * @Date: 2022-05-20 10:36:52
 * @LastEditTime: 2022-05-20 21:00:14
 * @FilePath: /front-end/src/components/Message/PMessage.vue
 * @Description: 通用消息组件，传入MessageType触发消息类型
-->
<template>
	<div ref="main" class="main">
		<div class="decoration"></div>
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
	import { computed, nextTick, ref, onMounted, readonly } from 'vue'
	import type { MessageType } from 'naive-ui'
	import gsap from 'gsap'

	const props = defineProps<{
		type: MessageType
	}>()

	const color = readonly<{ [key: string]: string }>({
		info: 'var(--stroke-hint-color)',
		success: 'var(--stroke-hint-success-color)',
		error: 'var(--stroke-hint-error-color)',
		warning: 'var(--stroke-hint-warn-color)',
	})

	const main = ref<HTMLDivElement>()
	onMounted(() => {
		if (main.value!.offsetHeight > 34) {
			const decoration =
				main.value?.getElementsByClassName('decoration')
			gsap.set(main.value!, {
				alignItems: 'center',
			})
			gsap.set(decoration!, {
				width: 'calc(var(--font-size) - 2px)',
				height: '80%',
				left: '10px',
			})
		}
		if (props.type) {
			gsap.set(main.value!, {
				'--display-color':
					color[props.type] || 'var(--stroke-hint-color)',
			})
		}
	})
</script>

<style scoped lang="scss">
	@import '@/assets/mixin.scss';
	.main {
		@include pagePara;
		--font-size: var(--hint-font-size);
		--display-color: var(--component-background-color);
		background-color: var(--component-background-color);
		font-size: var(--font-size);
		user-select: none;
		cursor: pointer;
		display: flex;
		position: relative;
		padding: 5px 12px;
		max-width: calc(100vw - 60px);
		align-items: flex-end;
		justify-content: center;
		box-shadow: var(--component-light-shadow);
		.decoration {
			position: absolute;
			width: calc(100% - 16px);
			height: calc(var(--font-size) - 4px);
			background-color: var(--display-color);
			opacity: 0.4;
		}
	}
</style>
