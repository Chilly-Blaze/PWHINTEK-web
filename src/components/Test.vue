<!--
 * @Author: ChillyBlaze
 * @Date: 2022-04-28 12:43:42
 * @LastEditTime: 2022-08-30 22:27:10
 * @FilePath: /front-end/src/components/Test.vue
 * @Description: 测试用例
-->
<template>
	<PPCCard
		v-if="data.display"
		src="/img/image1.jpeg"
		@bytes="sendAva"
		@close="data.display = false"
	></PPCCard>
</template>

<script setup lang="ts">
	import { rUpdAvatar } from '@/api'
	import { reactive } from 'vue'
	import { PPCCard } from '.'
	import { PMessage } from '.'
	const data = reactive({
		display: true,
	})
	const sendAva = async (bytes: any) => {
		try {
			let data = new FormData()
			data.append('file', bytes)
			await rUpdAvatar(data)
			PMessage.success('更新成功')
		} catch (err: any) {
			PMessage.error(err)
		}
	}
</script>

<style scoped></style>
