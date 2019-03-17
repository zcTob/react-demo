import React, { Component } from 'react'
import styles from './index.scss'

export default class Topic extends Component {
  render() {
    return (
      <div className={styles.topic}>
        <h2 className='title'>
          <a href='/'>Javascript</a>
        </h2>
        <div className='desc'>desc</div>
        <div className='toolbar'>
          <span className='time'>年月日</span>
          <span className='tag'>Javascript</span>
        </div>
      </div>
    )
  }
}
