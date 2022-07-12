// axios的基本使用
import axios from 'axios'

// 这里导入的axios已经是一个实例对象了，因此里面已经有post，get等方法。
// 1.get请求
axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
  console.log(res)
  // console.log(res.data)
})

// 2.get请求，并且传入参数
// axios
//   .get('http://httpbin.org/get', {
//     params: {
//       name: 'coderwhy',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// // 3.post请求
// axios
//   .post('http://httpbin.org/post', {
//     data: {
//       name: 'why',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// 补充：Promise本身也是可e以有类型的
// new Promise<string>((resolve) => {
//   resolve('abc')
// }).then((res) => {
//   console.log(res.length)
// })

// 4.aixos的配置选项
// 4.1全局配置
axios.defaults.baseURL = 'http://httpbin.org' //请求地址
axios.defaults.timeout = 10000 //请求超时设置
// axios.defaults.headers = {}

// 4.2每个请求的单独配置
//get请求
// axios
//   .get('/get', {
//     params: {
//       name: 'coderwhy',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// post请求
// axios
//   .post('/post', {
//     data: {
//       name: 'why',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// 5.aixos.all => 多个请求时，当多个请求都有数据时，再一起返回
axios
  .all([
    axios.get('/get', { params: { name: 'why', age: 18 } }),
    axios.post('./post', { data: { name: 'why', age: 18 } })
  ])
  .then((res) => {
    console.log(res[0].data)
    console.log(res[1].data)
  })

// 6.axios的拦截器
// 请求拦截
// fn1:请求发送成功会执行的函数
// fn2:请求发送失败会执行的函数

axios.interceptors.request.use(
  (config) => {
    //可以在这里进行一些想做的操作
    //  比如:
    // 1.给请求添加token
    // 2.添加isLoading动画
    console.log('请求拦截成功')
    return config
  },
  (err) => {
    console.log('请求发送错误')
    return err
  }
)

// 响应拦截
// fn1： 数据响应成功（服务器正常的返回了数据 返回200或20X）
axios.interceptors.response.use(
  (res) => {
    console.log('响应成功的拦截')
    return res
  },
  (err) => {
    console.log('服务器响应失败')
    return err
  }
)
