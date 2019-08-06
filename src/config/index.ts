import { Config } from './types'
let config: Config
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
    config = {
        baseUrl: '//api.hellozhangyu.top/api'
    }
} else {
    config = {
        baseUrl: 'http://localhost:3001/api'
    }
}
export default config
