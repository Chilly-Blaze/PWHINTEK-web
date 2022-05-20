/*
 * @Author: ChillyBlaze
 * @Date: 2022-05-20 10:40:46
 * @LastEditTime: 2022-05-20 20:53:19
 * @FilePath: /front-end/src/components/Message/index.ts
 * @Description: 自定义消息引用
 */
import type { MessageOptions, MessageRenderMessage } from 'naive-ui'
import { h } from 'vue'
import PMessageVue from './PMessage.vue'

const Message: MessageRenderMessage = (props) => {
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
const PMessage: MessageOptions = {
	render: Message,
	closable: true,
}
export { PMessage }
