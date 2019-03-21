import React, { Component } from 'react'
import styles from './index.scss'
import SimpleMDE from 'simplemde'
import 'simplemde/dist/simplemde.min.css'
import 'github-markdown-css/github-markdown.css'
import axios from '../../http'

export default class TopicEdit extends Component {
  markdownValue = null
  constructor() {
    super()
    this.markdown = React.createRef()
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    const dom = this.markdown.current
    /**
     * 取值：markdownValue.value()
     * 赋值：markdownValue.value(xxx)
     */
    this.markdownValue = new SimpleMDE({
      element: dom
    })
    document
      .getElementsByClassName('editor-preview-side')[0]
      .classList.add('markdown-body')
  }

  submit() {
    axios
      .post('/topic', {
        text: this.markdownValue.value()
      })
      .then((res) => {
        alert('添加成功')
        setTimeout(() => {
          this.props.history.push('/')
        }, 3000)
      })
  }

  render() {
    return (
      <div className={styles['topic-edit']}>
        <textarea ref={this.markdown} />
        <div className='form-submit'>
          <button className='submit-btn' onClick={this.submit}>
            发表
          </button>
        </div>
      </div>
    )
  }
}
