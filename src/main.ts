import { createApp } from 'vue'
import { globalRegister } from './global'
import 'normalize.css'
import './assets/css/index.less'

// 从 @element-plus/icons-vue 中导入所有图标并进行全局注册。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 全局引入
// import ElementPlus from 'element-plus'
// import 'element-plus/theme-chalk/index.css' //引入样式,全局引用

import App from './App.vue'

import router from './router'
import store from './store'
import { setupStore } from './store'

// createApp(App).mount('#app')
const app = createApp(App)
// 从 @element-plus/icons-vue 中导入所有图标并进行全局注册。
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 注册element-plus/其他
// globalRegister(app) (调用global文件夹里的index.ts的globalRegister)
app.use(globalRegister)

app.use(store)
// app.use(ElementPlus)
setupStore()
app.use(router)

app.mount('#app')
