import { createApp } from 'vue'

import { registerApp } from './global'

// 全局引入
// import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'  //有问题
// import 'element-plus/theme-chalk/index.css' //引入样式,全局引用

// 局部按需引入

import App from './App.vue'

import router from './router'
import store from './store'

// createApp(App).mount('#app')
const app = createApp(App)

registerApp(app)
app.use(router)
app.use(store)
// app.use(ElementPlus)
app.mount('#app')
