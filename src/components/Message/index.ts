/*
 * @Author: ChillyBlaze
 * @Date: 2022-05-20 10:40:46
 * @LastEditTime: 2022-05-24 18:25:53
 * @FilePath: /front-end/src/components/Message/index.ts
 * @Description: 自定义消息引用
 */
import type { MessageOptions, MessageRenderMessage } from 'naive-ui'
import { h } from 'vue'
import PMessageVue from './Message.vue'
import { useMessage } from 'naive-ui'

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
	duration: 5000,
	closable: true,
}
// const message = useMessage()
// const PMessage = {
// 	info: (content:string) => message.info(content, PMessageOptions),
// 	success: (content:string) => message.success(content, PMessageOptions),
// 	warning: (content:string) => message.warning(content, PMessageOptions),
// 	error: (content:string) => message.error(content, PMessageOptions),
// }
// TODO: 修改全局消息发送
export { PMessage }
