<!--
 * @Author: ChillyBlaze
 * @Date: 2022-04-23 12:59:27
 * @LastEditTime: 2022-05-24 22:07:42
 * @FilePath: /front-end/src/App.vue
 * @Description: 入口组件
-->
<template>
	<RouterView />
	<Test />
</template>

<script setup lang="ts">
	import { RouterView } from 'vue-router'
	import { useMessage } from 'naive-ui'
	import Test from './components/Test.vue'
	import { useUtilStore } from './stores/util'
	import { onMounted } from 'vue'
	const message = useMessage()
	const store = useUtilStore()
	onMounted(() => {
		store.message = message
	})
</script>
