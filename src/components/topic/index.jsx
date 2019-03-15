import React, { Component } from 'react'
import styles from './index.sass'

export default class Topic extends Component {
  render() {
    return (
      <div className={styles.topic}>
        <div className='title' />
        <div className='desc' />
        <div className='toolbar'>
          <span className='time' />
          <span className='tag' />
          <span
            className='prettier-class'
            id='prettier-id'
            onClick={this.handleClick}
          />
        </div>
      </div>
    )
  }
}
