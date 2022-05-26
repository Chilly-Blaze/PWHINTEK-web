<!--
 * @Author: ChillyBlaze
 * @Date: 2022-04-23 12:59:27
 * @LastEditTime: 2022-05-26 12:40:59
 * @FilePath: /front-end/src/App.vue
 * @Description: 入口组件
-->
<template>
	<!-- <RouterView /> -->
	<Test />
</template>

<script setup lang="ts">
	import { RouterView } from 'vue-router'
	import { useMessage } from 'naive-ui'
	import Test from './components/Test.vue'
	import { useUtilStore } from './stores/util'
	useUtilStore().message = useMessage()
</script>
