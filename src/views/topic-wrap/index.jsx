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

  deleteTopic(index, id) {
    axios.delete(`/topic/${id}`).then((res) => {
      if (res.data.status === 200) {
        const topicData = [...this.state.topicData]
        topicData.splice(index, 1)
        this.setState({
          topicData: topicData
        })
      }
    })
  }

  render() {
    return (
      <div className={styles['topic-wrap']}>
        {this.state.topicData.map((data, index) => (
          <TopicList
            index={index}
            key={data._id}
            id={data._id}
            title={data.title}
            time={1}
            tag={1}
            deleteTopic={(index, id) => this.deleteTopic.bind(this, index, id)}
          />
        ))}
      </div>
    )
  }
}

export default TopicWrap
