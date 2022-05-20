<!--
 * @Author: ChillyBlaze
 * @Date: 2022-04-28 12:43:42
 * @LastEditTime: 2022-05-20 10:37:29
 * @FilePath: /front-end/src/components/Test.vue
 * @Description: 
-->
<template>
	<button @click="test">123123</button>
</template>

<script setup lang="ts">
	import { useMessage } from 'naive-ui'
	const message = useMessage()
	function test() {}
</script>

<style scoped></style>
