import React, { useState, useEffect, useRef, ChangeEvent } from 'react'
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

const { TextArea } = Input

moment.locale('zh-cn')

interface CommentInputProps {
    comments: CommentsData[]
    id: string
}

export interface CommentsData {
    id: string
    time: Date | number
    value: string
}

interface CommentFormatData {
    avatar: string
    content: HTMLElement
    datetime: React.ReactElement<any>
}

const CommentList = ({ comments }: { comments: CommentFormatData[] }) => {
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

const Editor = ({
    onChange,
    onSubmit,
    submitting,
    value
}: {
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
    onSubmit: () => void
    submitting: boolean
    value: string
}) => {
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

const CommentInput = (props: CommentInputProps) => {
    const [state, setState] = useState({
        comments: [],
        submitting: false,
        value: ''
    })

    function formatComments(data: CommentInputProps['comments']) {
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

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
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
