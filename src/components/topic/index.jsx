import React, { Component } from 'react'
import styles from './index.scss'

export default class Topic extends Component {
  render() {
    return (
      <div className={styles.topic}>
        <h2 className='title'>
          <a href={`/detail/${this.props.id}`}>{this.props.title}</a>
        </h2>
        <div className='desc'>{this.props.text}</div>
        <div className='toolbar'>
          <span className='time'>年月日</span>
          <span className='tag'>Javascript</span>
        </div>
      </div>
    )
  }
}
