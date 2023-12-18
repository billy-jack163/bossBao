import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config'
import HYRequest from './request'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      // 每一个请求都自动携带token
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        // config.headers.Authorization = 'bears' + token
        // 类型缩小
        // 只有这种属性名写法，才能用扩展运算符来给token值进行空格分隔
        config.headers['Authorization'] = `bears ${token}`
      }
      return config
    }
  }
})

export default hyRequest
