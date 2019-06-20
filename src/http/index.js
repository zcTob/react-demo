import axios from 'axios'
import config from '../config'
import { message } from 'antd'
const instance = axios.create({
  baseURL: config.baseUrl,
  timeout: 1000,
  withCredentials: true
})

// instance.defaults.headers.post['Content-Type'] = 'application/json'

// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// Add a request interceptor
instance.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
instance.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response
  },
  function(error) {
    if (error.response) {
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
      if (error.response.status === 401) {
        window.location.href = '/login'
      }
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
      message.error(`系统出错.`)
    }
    // Do something with response error
    return Promise.reject(error)
  }
)

export default instance
