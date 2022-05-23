/*
 * @Author: ChillyBlaze
 * @Date: 2022-04-23 12:59:27
 * @LastEditTime: 2022-05-23 22:50:54
 * @FilePath: /front-end/src/main.ts
 * @Description: 项目入口
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { router } from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
