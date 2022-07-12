<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-model
      :defaultInfo="defaultInfo"
      ref="pageModelRef"
      pageName="users"
      :modelConfig="modelConfigRef"
    ></page-model>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modelConfig } from './config/model.config'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModel from '@/components/page-model'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModel } from '@/hooks/use-page-model'

export default defineComponent({
  name: 'users',
  components: {
    PageSearch,
    PageContent,
    PageModel
  },
  setup() {
    // 页面搜索相关hook逻辑
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    // 1.pageModel相关的hook逻辑(处理密码文本框的显示与否)
    const newCallback = () => {
      const passwordItem = modelConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      const passwordItem = modelConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }

    // 2.动态添加部门和角色列表
    const store = useStore()
    /*通过computed对数据进行刷新(因为当直接进入user页面的时候是拿不到部门和角色的数据的
    (因为这里的数据是异步请求,在执行数据添加的代码时,数据还没有请求下来)),*/
    const modelConfigRef = computed(() => {
      // 给部门options添加数据
      const departmentItem = modelConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })

      // 给角色options添加数据
      const roleItem = modelConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modelConfig
    })

    // 3.调用hook获取公共变量和函数(新建/编辑操作)
    const [pageModelRef, defaultInfo, handleNewData, handleEditData] =
      usePageModel(newCallback, editCallback)

    return {
      searchFormConfig,
      contentTableConfig,
      modelConfigRef,
      handleResetClick,
      handleQueryClick,
      pageContentRef,
      handleNewData,
      handleEditData,
      pageModelRef,
      defaultInfo
    }
  }
})
</script>

<style scoped></style>
