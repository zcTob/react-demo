import React, { useState, useEffect, useRef } from 'react'
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
import axios from '@http'
import { CommentsData } from './type'

const { TextArea } = Input

moment.locale('zh-cn')

const CommentList = ({ comments }) => {
    return (
        <List
            dataSource={comments}
            header={`${comments.length} ${
                comments.length > 1 ? 'replies' : 'reply'
            }`}
            itemLayout='horizontal'
            renderItem={({ content, avatar, datetime }) => (
                <Comment
                    author='zy'
                    content={content}
                    avatar={avatar}
                    datetime={datetime}
                />
            )}
        />
    )
}

const Editor = ({ onChange, onSubmit, submitting, value }) => {
    return (
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
}

interface CommentInputProps {
    comments: object[]
    id: string
}

const CommentInput = (props: CommentInputProps) => {
    const [state, setState] = useState({
        comments: [],
        submitting: false,
        value: ''
    })

    function formatComments(data) {
        return data.map((v) => {
            return {
                avatar:
                    'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: <p>{v.value}</p>,
                datetime: (
                    <Tooltip title={moment(v.time).format('llll')}>
                        <span>{moment(v.time).fromNow()}</span>
                    </Tooltip>
                )
            }
        })
    }

    function handleSubmit() {
        if (!state.value) {
            message.warning('请输入评论内容')
            return
        }

        setState((prevState) => {
            return {
                ...prevState,
                submitting: true
            }
        })

        const data: CommentsData = {
            id: props.id,
            time: new Date(),
            value: state.value
        }

        axios.post('/comments', data).then((res) => {
            setState({
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
                                    .subtract(data.time as number)
                                    .format('YYYY-MM-DD HH:mm:ss')}>
                                <span>
                                    {moment()
                                        .subtract(data.time as number)
                                        .fromNow()}
                                </span>
                            </Tooltip>
                        )
                    },
                    ...state.comments
                ]
            })
        })
    }

    function handleChange(e) {
        const value = e.target.value
        setState((prevState) => {
            return {
                ...prevState,
                value
            }
        })
    }

    useEffect(() => {
        const comments = formatComments(props.comments)
        setState((prevState) => {
            return {
                ...prevState,
                comments
            }
        })
    }, [props.comments])
    console.log('1111', state.comments)
    return (
        <div>
            {state.comments.length > 0 && (
                <CommentList comments={state.comments} />
            )}
            <Comment
                avatar={
                    <Avatar
                        src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                        alt='Han Solo'
                    />
                }
                content={
                    <Editor
                        onSubmit={handleSubmit}
                        submitting={state.submitting}
                        value={state.value}
                        onChange={handleChange}
                    />
                }
            />
        </div>
    )
}

export default CommentInput
