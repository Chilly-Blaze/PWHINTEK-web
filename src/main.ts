/*
 * @Author: ChillyBlaze
 * @Date: 2022-04-23 12:59:27
 * @LastEditTime: 2022-05-25 17:16:24
 * @FilePath: /front-end/src/main.ts
 * @Description: 项目入口
 */
import { createApp, h, type Component } from 'vue'

import App from '@/App.vue'
import { NMessageProvider } from 'naive-ui'
import { router } from '@/router'
import pinia from '@/stores'
import preview from './utils/mdPreview'

const app: Component = {
	render: () =>
		h(NMessageProvider, { max: 5 }, { default: () => h(App) }),
}
createApp(app).use(pinia).use(router).use(preview).mount('#app')
