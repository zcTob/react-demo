import React, { Component } from 'react'
import axios from '../../http'
import 'github-markdown-css/github-markdown.css'
import styles from './index.scss'

export default class TopicDetail extends Component {
  constructor() {
    super()
    this.markdown = React.createRef()
    this.state = {
      title: '',
      markdownValue: {
        __html: ''
      }
    }
  }
  componentDidMount() {
    const params = this.props.match.params
    axios.get(`/topic/${params.id}`).then((res) => {
      const data = res.data.data[0]
      this.setState({
        title: data.title,
        markdownValue: {
          __html: data.text
        }
      })
    })
  }

  render() {
    return (
      <div className={styles['topic-detail']}>
        <h1 className='title'>{this.state.title}</h1>
        <div
          className='content markdown-body'
          dangerouslySetInnerHTML={this.state.markdownValue}
        />
      </div>
    )
  }
}
