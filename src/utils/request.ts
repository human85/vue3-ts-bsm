import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/userStore'
import router from '@/router'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    const { token } = useUserStore()
    if (token) {
      config.headers.token = token
    }
    // 在发送请求之前做些什么
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // 简化返回的数据
    // console.log(response)
    return response.data
  },
  error => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // console.log(error)
    let msg = ''
    const status = error.response.status
    switch (status) {
      case 401:
        msg = 'token过期'
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器出现问题'
        break
      default:
        msg = '无网络'
    }
    ElMessage({
      type: 'error',
      message: msg
    })
    // token 过期重新跳转登录页
    const { logout } = useUserStore()

    if (status === 401) {
      logout()
      router.push({ path: '/', query: { redirect: router.currentRoute.value.path } })
    }

    return Promise.reject(error)
  }
)

export default request
