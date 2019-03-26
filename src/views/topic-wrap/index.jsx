import React, { Component } from 'react'
import TopicList from '../../components/topic'
import styles from './index.scss'
import axios from '../../http'
class TopicWrap extends Component {
  constructor() {
    super()
    this.state = {
      topicData: []
    }
  }
  componentDidMount() {
    axios.get('/topic').then((res) => {
      this.setState({
        topicData: res.data.data
      })
    })
  }

  render() {
    return (
      <div className={styles['topic-wrap']}>
        {this.state.topicData.map((data, index) => (
          <TopicList
            key={data._id}
            id={data._id}
            title={data.title}
            time={1}
            tag={1}
          />
        ))}
      </div>
    )
  }
}

export default TopicWrap
