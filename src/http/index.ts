import { TopicDataResponse, BaseResponse, Comments } from './types'
import axios from './init'

// 获取文章列表
export const getTopic = () => axios.get<TopicDataResponse>('/topic')

// 发表文章
export const postTopic = (title: string, text: string) =>
    axios.post<BaseResponse>('/topic', {
        title,
        text
    })

// 获取文章详情
export const getTopicDetail = (id: string | number) =>
    axios.get<TopicDataResponse>(`/topic/${id}`)

// 修改文章
export const putTopic = (id: string, title: string, text: string) =>
    axios.put<BaseResponse>(`/topic`, {
        id,
        title,
        text
    })

// 删除文章
export const deleteTopic = (id: string) =>
    axios.delete<BaseResponse>(`/topic/${id}`)

// 显示文章
export const showTopic = (id: string) => axios.put<BaseResponse>(`/topic/${id}`)

// 点赞
export const postLike = (id: string, like: number) =>
    axios.post<BaseResponse>('/like', { id, like })

// 登陆
export const login = (username: string, password: string) =>
    axios.post<BaseResponse>('/login', { username, password })

// 注册
export const register = (username: string, password: string) =>
    axios.post<BaseResponse>('/register', { username, password })

// 评论
export const postComments = ({ id, time, value }: Comments) =>
    axios.post('/comments', { id, time, value })

export * from './types'

export default axios
