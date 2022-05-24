<!--
 * @Author: ChillyBlaze
 * @Date: 2022-04-28 12:43:42
 * @LastEditTime: 2022-05-24 21:45:33
 * @FilePath: /front-end/src/components/Test.vue
 * @Description: 测试用例
-->
<template>
	<button @click="test">123123</button>
</template>

<script setup lang="ts">
	import { PMessage } from '@/components'
	function test() {
		PMessage.info('123123')
	}
</script>

<style scoped></style>
