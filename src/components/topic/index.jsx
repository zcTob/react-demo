import React, { Component } from 'react'
import styles from './index.scss'
import { Icon } from 'antd'
export default class Topic extends Component {
  render() {
    return (
      <div className={styles.topic}>
        <div className='tips'>
          <span className='name'>zangyu</span>
          <span className='time'>一天前</span>
          <span className='types'>javascript</span>
        </div>
        <h2 className='title'>
          <a className='name' href={`/detail/${this.props.id}`}>
            {this.props.title}
          </a>
          {/* <span
            className='delete-topic'
            onClick={this.props.deleteTopic(this.props.index, this.props.id)}>
            删除
          </span> */}
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
