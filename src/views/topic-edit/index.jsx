import React, { Component } from 'react'
import styles from './index.scss'
import SimpleMDE from 'simplemde'
import 'simplemde/dist/simplemde.min.css'
import 'github-markdown-css/github-markdown.css'
export default class TopicEdit extends Component {
  constructor() {
    super()
    this.markdown = React.createRef()
  }

  componentDidMount() {
    const dom = this.markdown.current
    new SimpleMDE({
      element: dom
    })
    document
      .getElementsByClassName('editor-preview-side')[0]
      .classList.add('markdown-body')
  }

  render() {
    return (
      <div className={styles['topic-edit']}>
        <textarea ref={this.markdown} />
        <div className='form-submit'>
          <button className='submit-btn'>发表</button>
        </div>
      </div>
    )
  }
}
