import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',
  timeout: 1000
})

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
    console.log(error.response)
    // console.log(error.request)
    // console.log(error.message)
    if (error.response.status === 401) {
      window.location.href = '/login'
    }
    // Do something with response error
    return Promise.reject(error)
  }
)

export default instance
