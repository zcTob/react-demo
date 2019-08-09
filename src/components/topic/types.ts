export interface OnLike {
    (id: string, like: number, index: number): void
}

export interface TopicProps {
    index: number
    key: number
    id: string
    title: string
    createTime: string
    author: string
    tag: number
    likeNum: number
    comments: []
    onLike: OnLike
}
