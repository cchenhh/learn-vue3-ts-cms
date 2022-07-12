// 1.方式一：手动的切换不同的环境（不推荐）
// const BASE_URL = 'http://coderwhy.org/dev' //开发环境   npm run serve
// const BASE_NAME = 'coderwhy'

// const BASE_URL = 'http://coderwhy.org/prod' //生产环境   npm run build
// const BASE_NAME = 'kobe'

// const BASE_URL = 'http://coderwhy.org/test' //测试环境
// const BASE_NAME = 'james'

// 2.根据process.env.NODE_ENV来区分：推荐使用这种方式
// 开发环境：development
// 生产环境：production
// 测试环境：test

// let BASE_URL = ''
// let BASE_NAME = ''

// if (process.env.NODE_ENV === 'development') {
//   BASE_URL = 'http://coderwhy.org/dev'
//   BASE_NAME = 'coderwhy'
// } else if (process.env.NODE_ENV === 'production') {
//   BASE_URL = 'http://coderwhy.org/prod'
//   BASE_NAME = 'kobe'
// } else {
//   BASE_URL = 'http://coderwhy.org/test'
//   BASE_NAME = 'james'
// }

// export { BASE_URL, BASE_NAME }

let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  // BASE_URL = 'http://123.207.32.32:8000/'
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://coderwhy.org/prod'
} else {
  BASE_URL = 'http://coderwhy.org/test'
}

export { BASE_URL, TIME_OUT }

// 关于变量的export导出语法
// 在ES6中不允许先定义变量之后再按以下方式导出
// let name = ''
// export name   //错误的
// 要是先定义了变量，要以对象(但其实不是对象，是ESmodule里面的一个特殊语法)的形式导出
// 如下：
// let name = ''
// export {name}

// 不然就要直接在定义变量的时候直接导出
// 如：
// export const = ''
