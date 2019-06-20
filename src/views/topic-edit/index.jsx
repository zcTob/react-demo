import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import styles from './index.scss'
import axios from '../../http'
import { Button, Upload, message, Icon } from 'antd'
import config from '../../config'
let imgUrl = ''

const props = {
  accept: 'image/*',
  name: 'file',
  action: `${config.baseUrl}/upload/img`,
  // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  withCredentials: true,
  showUploadList: false
}

export default class TopicEdit extends Component {
  constructor() {
    super()
    this.state = {
      markdownValue: '',
      loading: false
    }
    this.titleRef = React.createRef()
    this.bodyChange = this.bodyChange.bind(this)
    this.submit = this.submit.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
  }

  submit() {
    this.setState({
      loading: true
    })
    const params = this.props.match.params
    if (params.id) {
      axios
        .put(`/topic`, {
          id: params.id,
          title: this.titleRef.current.value,
          text: this.state.markdownValue
        })
        .then((res) => {
          message.success('修改成功，3s后跳到首页')
          setTimeout(() => {
            this.props.history.push('/')
          }, 3000)
        })
        .catch(() => {
          this.setState({
            loading: false
          })
        })
    } else {
      axios
        .post('/topic', {
          title: this.titleRef.current.value,
          text: this.state.markdownValue
        })
        .then((res) => {
          setTimeout(() => {
            this.props.history.push('/')
          }, 3000)
        })
        .catch(() => {
          this.setState({
            loading: false
          })
        })
    }
  }

  componentDidMount() {
    const params = this.props.match.params
    if (params.id) {
      axios.get(`/topic/${params.id}`).then((res) => {
        const data = res.data.data[0]
        this.setState({
          markdownValue: data.text ? data.text : ''
        })
        this.titleRef.current.value = data.title
      })
    }
  }

  bodyChange(event) {
    this.setState({
      markdownValue: event.target.value
    })
  }

  onFileChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功`)
      imgUrl = info.file.response.data.url
      const markdownUrl = `![](${config.baseUrl}${imgUrl})`
      this.setState({
        markdownValue: this.state.markdownValue + markdownUrl
      })
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败.`)
    }
  }

  render() {
    return (
      <div className={styles['topic-edit']}>
        <header className='header'>
          <input
            className='title'
            type='text'
            placeholder='请输入标题'
            ref={this.titleRef}
          />
          <Upload
            className='upload-img'
            {...props}
            onChange={this.onFileChange}>
            <Button>
              <Icon type='picture' /> 上传图片
            </Button>
          </Upload>
          <Button
            type='primary'
            loading={this.state.loading}
            onClick={this.submit}>
            保存
          </Button>
        </header>
        <div className='wrap'>
          <div className='edit-area'>
            <textarea
              value={this.state.markdownValue}
              placeholder='请输入内容'
              name=''
              id=''
              cols='30'
              rows='10'
              onChange={this.bodyChange}
            />
          </div>
          <div className='edit-show'>
            <ReactMarkdown source={this.state.markdownValue} />
          </div>
        </div>
      </div>
    )
  }
}
