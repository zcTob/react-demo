import React, { Component } from 'react'
import TopicList from '../../components/topic'
import styles from './index.scss'

class TopicWrap extends Component {
  render() {
    return (
      <div className={styles['topic-wrap']}>
        <TopicList title={1} desc={1} time={1} tag={1} />
        <TopicList title={1} desc={1} time={1} tag={1} />
      </div>
    )
  }
}

export default TopicWrap
