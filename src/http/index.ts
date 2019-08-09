import { TopicDataResponse, PostTopicDataResponse } from './types'
import axios from './init'

export const getTopic = () => axios.get<TopicDataResponse>('/topic')

export const postTopic = (title: string, text: string) =>
    axios.post<PostTopicDataResponse>('/topic', {
        title,
        text
    })

export const getTopicDetail = (id: string | number) => axios.get(`/topic/${id}`)

export const putTopic = (id: string, title: string, text: string) =>
    axios.put(`/topic`, {
        id,
        title,
        text
    })

export const postLike = (id: string, like: number) =>
    axios.post('/like', { id, like })

export default axios
