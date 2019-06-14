import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import styles from './index.scss'
import 'github-markdown-css/github-markdown.css'
import axios from '../../http'
import { Button } from 'antd'
const input = '# This is a header\n\nAnd this is a paragraph'
export default class TopicEdit extends Component {
  markdownValue = null
  constructor() {
    super()
  }

  // submit() {
  //   axios
  //     .post('/topic', {
  //       title: this.markdownTitle.current.value,
  //       text: html
  //     })
  //     .then((res) => {
  //       alert('添加成功')
  //       setTimeout(() => {
  //         this.props.history.push('/')
  //       }, 3000)
  //     })
  // }

  render() {
    return (
      <div className={styles['topic-edit']}>
        <header class='header'>
          <input class='title' type='text' />
          <Button type='primary'>Button</Button>
          <span>保存</span>
          <span />
          <span />
        </header>
        <div className='wrap'>
          <div className='edit-area'>
            <textarea name='' id='' cols='30' rows='10' />
          </div>
          <div className='edit-show'>
            <ReactMarkdown source={input} />
          </div>
        </div>
      </div>
    )
  }
}
