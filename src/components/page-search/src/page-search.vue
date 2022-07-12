<template>
  <div class="page-search">
    <hy-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button @click="handleResetClick">
            <el-icon><Refresh /></el-icon>重置
          </el-button>
          <el-button type="primary" @click="handleQueryClick">
            <el-icon><Search /></el-icon>搜索
          </el-button>
        </div>
      </template>
    </hy-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HyForm from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    HyForm
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // 双向绑定的属性应该是由配置文件的field来决定的
    // 1.优化一:formData中的属性应该动态来决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    // 2.优化二: 当用户点击重置时,将输入框的数据清空
    const handleResetClick = () => {
      // 方法一:
      // 不会修改掉form.vue 内部的formData(因为整个formData使拷贝通过modelValue浅拷贝出来的) (不采用v-model语法糖的时候可以这样直接修改整个对象的值)
      formData.value = formOriginData
      // console.log(formOriginData)

      emit('resetBtnClick')

      // 方法二:
      // 采用v-model语法糖形式的时候要这样,通过改变内部的属性,来使formData内部的属性的值发生改变,从而使form.vue里的的formData发生改变
      // for (const key in formOriginData) {
      //   formData.value[`${key}`] = formOriginData[key]
      // }
    }

    // 3.优化三:当用户点击搜索按钮进行搜索
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }

    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped>
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
