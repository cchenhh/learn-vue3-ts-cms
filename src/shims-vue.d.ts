/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 声明确实有存在的变量或者常量，这样main.ts之中才不会报错
// declare let $store: any
declare module '*.json'
