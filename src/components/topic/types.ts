export interface OnLike {
    (id: number, like: number, index: number): void
}

export interface TopicProps {
    index: number
    key: number
    id: number
    title: string
    createTime: string
    author: string
    tag: number
    likeNum: number
    comments: []
    onLike: OnLike
}
