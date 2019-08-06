export interface ResData {
    code: number
    msg?: string
    data?: Record<string, any>
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
