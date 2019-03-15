import React, { Component } from 'react'
import styles from './App.sass'
import Header from '../components/header'
import TopicList from '../components/topic'
class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className={styles['topic-wrap']}>
          <TopicList title={1} desc={1} time={1} tag={1} />
        </div>
      </div>
    )
  }
}

export default App
