<!--
 * @Author: ChillyBlaze
 * @Date: 2022-05-21 20:55:25
 * @LastEditTime: 2022-05-23 20:23:46
 * @FilePath: /front-end/src/components/Popover/Popover.vue
 * @Description: 通用化自定义Popover
-->
<template>
	<NPopover
		trigger="click"
		:placement="placement"
		:showArrow="false"
		style="
			box-shadow: 0 1px 3px rgba(143, 136, 143, 0.3);
			padding: 0;
		"
	>
		<template #trigger>
			<slot></slot>
		</template>
		<div v-if="judge" class="content">
			{{ props.msg }}
			<div class="decoration"></div>
		</div>
	</NPopover>
</template>

<script setup lang="ts">
	import { NPopover } from 'naive-ui'
	import type { FollowerPlacement } from 'vueuc'
	const props = defineProps<{
		judge: boolean
		placement: FollowerPlacement
		msg: string
	}>()
</script>

<style scoped lang="scss">
	@import '@/assets/mixin.scss';
	.content {
		@include pagePara;
		position: relative;
		color: var(--font-color);
		font-size: var(--hint-font-size);
		padding: var(--common-padding);
		max-width: 15em;
		.decoration {
			position: absolute;
			width: 12em;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			height: calc(1em - 2px);
			transform: rotate(-4deg);
			background-color: var(--stroke-hint-color);
			opacity: 0.3;
		}
	}
</style>
