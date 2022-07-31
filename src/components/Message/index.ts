/*
 * @Author: ChillyBlaze
 * @Date: 2022-05-20 10:40:46
 * @LastEditTime: 2022-05-24 21:50:49
 * @FilePath: /front-end/src/components/Message/index.ts
 * @Description: 自定义消息引用
 */
import type { MessageOptions, MessageRenderMessage } from 'naive-ui'
import { h } from 'vue'
import PMessageVue from './Message.vue'
import { useUtilStore } from '@/stores/util'
import pinia from '@/stores'

const store = useUtilStore(pinia)

const MessageRender: MessageRenderMessage = (props) => {
	return h(
		PMessageVue,
		{
			onClick: () => {
				props.onClose!()
			},
			type: props.type,
		},
		{
			default: () => props.content,
		},
	)
}

const PMessageOptions: MessageOptions = {
	render: MessageRender,
	duration: 5000,
	closable: true,
}
const PMessage = {
	info: (content: string) =>
		store.message!.info(content, PMessageOptions),
	success: (content: string) =>
		store.message!.success(content, PMessageOptions),
	warning: (content: string) =>
		store.message!.warning(content, PMessageOptions),
	error: (content: string) =>
		store.message!.error(content, PMessageOptions),
}
export { PMessage }
