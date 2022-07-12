import { ref } from 'vue'
import PageModel from '@/components/page-model'

// 新建/编辑操作逻辑
// callbackFn:表示函数类型
type CallbackFn = (item?: any) => void
export function usePageModel(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModelRef = ref<InstanceType<typeof PageModel>>()
  // 默认初始化值
  const defaultInfo = ref<any>([])
  const handleNewData = () => {
    defaultInfo.value = {}
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
    newCb && newCb()
  }
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
    console.log('点击了编辑按钮-------', item)

    editCb && editCb(item)
  }
  return [pageModelRef, defaultInfo, handleNewData, handleEditData]
}
