import { useStore } from '@/store'

// 使用权限验证
export function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  const permissions = store.state.login.permissions
  const verifyPermission = `system:${pageName}:${handleName}`
  return !!permissions.find((item) => item === verifyPermission)

  // name = "coderwhy"
  // !name = false
  // !!name = true
}
