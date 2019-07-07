import React, { Component } from 'react'
import styles from './index.scss'
import { Icon } from 'antd'
import { parseDate } from '../../utils'
export default class Topic extends Component {
  render() {
    const { time, title, id } = this.props
    const parseTime = parseDate(time)
    return (
      <div className={styles.topic}>
        <div className='tips'>
          <span className='name'>zangyu</span>
          <span className='time'>{parseTime}</span>
          <span className='types'>javascript</span>
        </div>
        <h2 className='title'>
          <a className='name' href={`/detail/${id}`}>
            {title}
          </a>
        </h2>
        <div className='operation'>
          <span className='like'>
            <Icon type='like' />
            <strong>72</strong>
          </span>
          <span className='comment'>
            <Icon type='message' />
            <strong>12</strong>
          </span>
        </div>
      </div>
    )
  }
}
