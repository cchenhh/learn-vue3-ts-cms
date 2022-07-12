import * as echarts from 'echarts'

// 注册地图
import ChinaMapData from '../data/china.json'
echarts.registerMap('china', ChinaMapData)

export default function (el: HTMLElement) {
  // 初始化echarts的实例
  const echartInstance = echarts.init(el)

  // 设置配置,并且开始绘制
  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }

  // 当不是浏览器页面大小发生变化时,需要自己手动调用 echartInstance.resize()这个函数
  const updateSize = () => {
    echartInstance.resize()
  }

  // 当浏览器页面大小发生改变时,图形的大小也发生相应的改变
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  return {
    echartInstance,
    setOptions
  }
}
