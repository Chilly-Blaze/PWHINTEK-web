<!--
 * @Author: ChillyBlaze
 * @Date: 2022-04-28 12:43:42
 * @LastEditTime: 2022-05-20 21:02:58
 * @FilePath: /front-end/src/components/Test.vue
 * @Description: 测试用例
-->
<template>
	<button @click="test">123123</button>
</template>

<script setup lang="ts">
	import { useMessage } from 'naive-ui'
	import { PMessage } from '@/components/Message'
	const message = useMessage()
	function test() {
		message.error(
			'人生的道路是漫长的，如果你只会一味的感伤失去，那么你将一无所有，只有有能力去享受失去的“乐趣”的人，才能真正品尝到人生的幸福。让自己承受失去的东西，也许你会感到很痛苦，那也要自己去承受，别人是代替不了你的。伤和痛是有的，这就证明你已经长大了，成熟了。失去的时候，你可以哭，可以发泄，可以找朋友倾诉……过后，你的世界就会充满了阳光。',
			PMessage,
		)
		message.loading('你好', PMessage)
		message.success('你好好', PMessage)
	}
</script>

<style scoped></style>
