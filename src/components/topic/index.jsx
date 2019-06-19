import React, { Component } from 'react'
import styles from './index.scss'
export default class Topic extends Component {
  render() {
    return (
      <div className={styles.topic}>
        <h2 className='title'>
          <a className='name' href={`/detail/${this.props.id}`}>
            {this.props.title}
          </a>
          <span
            className='delete-topic'
            onClick={this.props.deleteTopic(this.props.index, this.props.id)}>
            删除
          </span>
        </h2>
      </div>
    )
  }
}
