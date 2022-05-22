<!--
 * @Author: ChillyBlaze
 * @Date: 2022-05-21 20:55:25
 * @LastEditTime: 2022-05-22 13:29:10
 * @FilePath: /front-end/src/components/Popover/Popover.vue
 * @Description: 通用化自定义Popover
-->
<template>
	<NPopover trigger="click" :placement="placement">
		<template #trigger>
			<slot></slot>
		</template>
		<div v-if="judge">test</div>
	</NPopover>
</template>

<script setup lang="ts">
	import { NPopover } from 'naive-ui'
	import type { FollowerPlacement } from 'vueuc'
	defineProps<{
		judge: boolean
		placement: FollowerPlacement
	}>()
</script>

<style scoped></style>
