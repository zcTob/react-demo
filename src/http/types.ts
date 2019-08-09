export interface BaseData {
    code: number
}

export interface BaseResponse extends BaseData {
    data: string
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
