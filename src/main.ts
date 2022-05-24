/*
 * @Author: ChillyBlaze
 * @Date: 2022-04-23 12:59:27
 * @LastEditTime: 2022-05-24 18:34:00
 * @FilePath: /front-end/src/main.ts
 * @Description: 项目入口
 */
import { createApp } from 'vue'

import App from '@/App.vue'
import { router } from '@/router'
import pinia from '@/stores'

const app = createApp(App)

app.use(pinia)
app.use(router)

// TODO: 全局消息发生器挂载
app.mount('#app')
