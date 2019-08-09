import { TopicDataResponse, BaseResponse, TopicData } from './types'
import axios from './init'

export const getTopic = () => axios.get<TopicDataResponse>('/topic')

export const postTopic = (title: string, text: string) =>
    axios.post<BaseResponse>('/topic', {
        title,
        text
    })

export const getTopicDetail = (id: string | number) =>
    axios.get<TopicData>(`/topic/${id}`)

export const putTopic = (id: string, title: string, text: string) =>
    axios.put<BaseResponse>(`/topic`, {
        id,
        title,
        text
    })

export const postLike = (id: string, like: number) =>
    axios.post<BaseResponse>('/like', { id, like })

const a = (a: any) => console.log(a)

export default axios
