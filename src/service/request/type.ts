import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface HYRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  // 错误拦截
  requestInterceptorCatch?: (error: any) => any

  // responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  // responseInterceptor?: (res: any) => any
  responseInterceptor?: (res: T) => T
  // 错误拦截
  responseInterceptorCatch?: (error: any) => any
}

export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYRequestInterceptors<T>
  headers?: any
  showLoading?: boolean
}
