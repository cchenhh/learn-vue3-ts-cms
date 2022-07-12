import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { HYRequestInterceptors, HYRequestConfig } from './type'

import { ElLoading } from 'element-plus'
// 样式需要自己导入了
import 'element-plus/es/components/base/style/css'
import 'element-plus/theme-chalk/el-loading.css'
// import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

const DEFAULT_LOADING = true

// 拦截器
// 以下内容封装到type.ts中
// interface HYRequestInterceptors {
//   requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
//   // 错误拦截
//   requestInterceptorCatch?: (error: any) => any

//   responseInterceptor?: (res: AxiosResponse) => AxiosResponse
//   // 错误拦截
//   responseInterceptorCatch?: (error: any) => any
// }

// interface HYRequestConfig extends AxiosRequestConfig {
//   interceptors?: HYRequestInterceptors
// }

class HYRequest {
  // 关于在开发时如果有多个对应的request对象时，创建多个对应的instance实例
  // 防止后续创建两个实例的时候互相进行干扰
  // 在传入不同的配置的时候，每次都会创建一个新的instance
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance

  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    // 从config中取出的拦截器时对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有的实例都有的拦截器：请求成功拦截')
        // 在需要loading的情况下才显示loading
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            // spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0,0.5)'
          })
        }
        return config
      },
      (err) => {
        console.log('所有的实例都有的拦截器：请求失败拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有的实例都有的拦截器：响应成功拦截')

        // 将loading移除
        this.loading?.close()
        // setTimeout(() => {
        //   this.loading?.close()
        // }, 1000)

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败~,错误信息')
        } else {
          return data
        }
      },
      (err) => {
        console.log('所有的实例都有的拦截器：响应失败拦截')

        // 将loading移除
        this.loading?.close()
        // setTimeout(() => {
        //   this.loading?.close()
        // }, 1000)

        if (err.response.status === 404) {
          console.log('404的错误~')
        }
        return err
      }
    )
  }

  request<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 对某个函数单独请求的拦截器(单个请求对请求config的处理)
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 当某个请求不需要显示loading时（判断是否需要显示loading）
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // console.log(res)

          // 2.再将某个请求设置成为不需要loading显示之后,需要将showLoading的值设置回true,这样才不会影响下一个请求
          this.showLoading = DEFAULT_LOADING

          // 3.将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          // 将showLoading的值设置回true, 这样才不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
