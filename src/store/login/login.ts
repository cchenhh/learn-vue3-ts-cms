import { Module } from 'vuex'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import localCache from '@/utils/cache'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'
import router from '@/router/index'

import { IAccount } from '@/service/login/type'
import { IRootState } from '../type'
import { ILoginState } from './type'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      // console.log(token)
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // 1.userMenus =>(映射) routes
      const routes = mapMenusToRoutes(userMenus)
      console.log(routes)
      // 2.将routes => (添加到)router文件夹index.tsd的main路由的children里面
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      //  获取用户按钮的权限
      const permissions = mapMenusToPermissions(userMenus)
      // console.log(permissions)
      state.permissions = permissions
    }
  },
  getters: {},
  actions: {
    // 账号密码登录跳转逻辑
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      console.log('执行accountLoginAction', payload)
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      // 这里会有跨域访问的问题 ->跳转到vue.config.js解决问题
      // console.log(loginResult)
      // console.log(loginResult.data.id, loginResult.data.token)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      // 将token缓存起来
      localCache.setCache('token', token)

      // 1.2在将token存起来之后,发送初始化的请求(包括完整的角色role和部门department数据)
      // 在模块里面调取根里面的action
      dispatch('getInitialDataAction', null, { root: true })

      // 2.请求用户信息的数据
      const userInfoResult = await requestUserInfoById(id)
      // console.log(userInfoResult)
      //401没有授权,没有传token
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      // 将用户信息userInfo缓存起来
      localCache.setCache('userInfo', userInfo)

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      // console.log(userMenusResult)
      const userMenus = userMenusResult.data
      // console.log(userMenus)
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 4.跳转到首页
      router.push('/main')
    },
    // 对已经登录之后,直接跳转到首页或者刷新页面之后vuex里面的数据为空的解决(没有经过登录页面的登录操作)
    // 刷新操作
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      // 发送初始化的请求(包括完整的角色role和部门department数据)
      dispatch('getInitialDataAction', null, { root: true })

      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }

    // 手机验证登录跳转逻辑
    // phoneLoginAction({ commit }, payload: any) {
    //   console.log('执行phoneLoginAction')
    // }
  }
}

export default loginModule
