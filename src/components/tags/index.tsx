import React, { Component } from 'react'
import styles from './index.scss'

export default class Tags extends Component {
  render() {
    return (
      <div className={styles.tags}>
        <div className='mcontainer wrap'>
          <span className='active'>推荐</span>
          <span>前端</span>
          <span>后端</span>
        </div>
      </div>
    )
  }
}
