export interface BaseData {
    code: number
}

export interface TopicData {
    author: string
    comments: Comments[]
    createTime: string
    deleted: boolean
    like: number
    text: string
    title: string
    updateTime: string
    _id: string
}

interface Comments {
    id: string
    time: string
    value: string
}

export interface TopicDataResponse extends BaseData {
    data: TopicData[]
}

export interface PostTopicDataResponse extends BaseData {
    data: string
}
