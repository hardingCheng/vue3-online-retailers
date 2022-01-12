import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 重置样式使用normalize.css，项目公用样式common.scss
import 'normalize.css'
import '@/styles/common.scss'

import qcompent from './components/library'
// 插件的使用，在main.js使用app.use(插件)
createApp(App).use(store).use(router).use(qcompent).mount('#app')
