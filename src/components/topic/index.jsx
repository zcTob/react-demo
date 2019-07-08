import React, { Component } from 'react'
import styles from './index.scss'
import { Icon } from 'antd'
import { parseDate } from '../../utils'
export default class Topic extends Component {
  render() {
    const {
      index,
      createTime,
      title,
      id,
      author,
      comments,
      like,
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
          <span className='like' onClick={() => onLike(id, like, index)}>
            <Icon type='like' />
            <strong>{like}</strong>
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
