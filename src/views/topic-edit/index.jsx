import React, { Component } from 'react'
import styles from './index.scss'
const ReactMarkdown = require('react-markdown')
export default class TopicEdit extends Component {
  state = {
    markdownValue: ''
  }

  constructor() {
    super()
    this.mdEdit = this.mdEdit.bind(this)
  }

  mdEdit(e) {
    this.setState({
      markdownValue: e.target.value
    })
  }

  render() {
    const { markdownValue } = this.state
    return (
      <div className={styles['topic-edit']}>
        <div className='edit-area'>
          <textarea
            placeholder='请输入内容'
            value={markdownValue}
            onChange={this.mdEdit}
          />
        </div>
        <div className='preview'>
          <div className={styles['md-style']}>
            <ReactMarkdown source={markdownValue} />
          </div>
        </div>
      </div>
    )
  }
}
