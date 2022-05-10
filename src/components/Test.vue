<template>
	<input
		type="text"
		:value="props.modelValue"
		@input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
	/>
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue'
	const props = defineProps<{
		modelValue?: string
	}>()
</script>

<style scoped></style>
