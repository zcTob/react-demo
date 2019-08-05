import React, { Component } from 'react'
import styles from './index.scss'
import { Icon } from 'antd'
import { parseDate } from '../../utils'
import comments from '../comments'

interface Props {
    index: number
    key: number
    id: number
    title: string
    createTime: string
    author: string
    tag: number
    likeNum: number
    comments: []
    onLike(id: number, like: number, index: number): void
}

export default class Topic extends Component<Props> {
    render() {
        const {
            index,
            createTime,
            title,
            id,
            author,
            comments,
            likeNum,
            onLike
        } = this.props
        const parseTime = parseDate(createTime)
        return (
            <div className={styles.topic}>
                <div className='tips'>
                    <span className='name'>{author}</span>
                    <span className='time'>{parseTime}</span>
                    <span className='types'>javascript</span>
                </div>
                <h2 className='title'>
                    <a className='name' href={`/detail/${id}`}>
                        {title}
                    </a>
                </h2>
                <div className='operation'>
                    <span
                        className='like'
                        onClick={() => onLike(id, likeNum, index)}>
                        <Icon type='like' />
                        <strong>{likeNum}</strong>
                    </span>
                    <span className='comment'>
                        <Icon type='message' />
                        <strong>{comments.length}</strong>
                    </span>
                </div>
            </div>
        )
    }
}
