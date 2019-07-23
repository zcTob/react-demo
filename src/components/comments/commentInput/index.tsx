import React from 'react'
import {
  Comment,
  Avatar,
  Form,
  Button,
  List,
  Input,
  message,
  Tooltip
} from 'antd'
import moment from 'moment'
import axios from '../../../http'
const { TextArea } = Input

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout='horizontal'
    renderItem={(props) => <Comment {...props} />}
  />
)

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType='submit'
        loading={submitting}
        onClick={onSubmit}
        type='primary'>
        添加评论
      </Button>
    </Form.Item>
  </div>
)

export default class CommnetInput extends React.Component {
  state = {
    comments: [],
    submitting: false,
    value: '',
    id: null
  }

  componentWillReceiveProps(nextProps) {
    // Any time props.email changes, update state.
    let comments = this.formatComments(nextProps.comments)
    this.setState({
      comments,
      id: nextProps.id
    })
  }

  componentWillUpdate() {}

  componentDidMount() {}

  formatComments(data) {
    return data.map((v) => {
      return {
        avatar:
          'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: <p>{v.value}</p>,
        datetime: (
          <Tooltip
            title={moment()
              .subtract(v.time)
              .format('YYYY-MM-DD HH:mm:ss')}>
            <span>
              {moment()
                .subtract(v.time)
                .fromNow()}
            </span>
          </Tooltip>
        )
      }
    })
  }

  handleSubmit = () => {
    if (!this.state.value) {
      message.warning('请输入评论内容')
      return
    }

    this.setState({
      submitting: true
    })

    const data = {
      id: this.state.id,
      time: new Date(),
      value: this.state.value
    }

    axios.post('/comments', data).then((res) => {
      this.setState({
        submitting: false,
        value: '',
        comments: [
          {
            avatar:
              'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{data.value}</p>,
            datetime: (
              <Tooltip
                title={moment()
                  .subtract(data.time)
                  .format('YYYY-MM-DD HH:mm:ss')}>
                <span>
                  {moment()
                    .subtract(data.time)
                    .fromNow()}
                </span>
              </Tooltip>
            )
          },
          ...this.state.comments
        ]
      })
    })
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    const { comments, submitting, value } = this.state

    return (
      <div>
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          avatar={
            <Avatar
              src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
              alt='Han Solo'
            />
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </div>
    )
  }
}
