import React, { useState, useEffect, ChangeEvent } from 'react'
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

const CommentList = ({ comments }) => {
    console.log(comments)
    return (
        <List
            dataSource={comments}
            header={`${comments.length} ${
                comments.length > 1 ? 'replies' : 'reply'
            }`}
            itemLayout='horizontal'
            renderItem={() => <Comment content={comments.content} />}
        />
    )
}

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

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setState((prevState) => {
            return {
                ...prevState,
                value: e.target.value
            }
        })
    }

    useEffect(() => {
        setState((prevState) => {
            return {
                ...prevState,
                comments: formatComments(props.comments)
            }
        })
    }, [props.comments])

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
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={state.submitting}
                        value={state.value}
                    />
                }
            />
        </div>
    )
}

export default CommentInput
