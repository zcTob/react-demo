let config
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
  config = {
    baseUrl: '//api.hellozhangyu.top/api'
  }
} else {
  config = {
    baseUrl: '/api'
  }
}
export default config
