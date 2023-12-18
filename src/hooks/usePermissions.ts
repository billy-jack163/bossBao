import useLoginStore from '@/store/login/login'

function usePermissions(permissionID: string) {
  const loginStore = useLoginStore()
  const { permissions } = loginStore
  // !!双感叹号的作用就是将该高阶函数是否满足条件的转换为布尔值
  return !!permissions.find((item) => item.includes(permissionID))
}

export default usePermissions
