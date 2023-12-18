import useLoginStore from '@/store/login/login'
export default function useAllow(allow: string) {
  const useLogin = useLoginStore()
  const { permissions } = useLogin
  const isAllow = permissions.includes(allow)
  return isAllow
}
