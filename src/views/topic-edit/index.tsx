import React, { ChangeEvent, useRef, useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import ReactMarkdown from 'react-markdown'
import styles from './index.scss'
import axios, { postTopic, putTopic, getTopicDetail } from '@http'
import { Button, Upload, message, Icon } from 'antd'
import { UploadChangeParam } from 'antd/lib/upload/interface'
import config from '../../config'
let imgUrl = ''

const uploadProps = {
    accept: 'image/*',
    name: 'file',
    action: `${config.baseUrl}/upload/img`,
    withCredentials: true,
    showUploadList: false
}

interface State {
    markdownValue: string
    loading: boolean
}

type Props = RouteComponentProps<{ id: string }>

function TopicEdit(props: Props) {
    const titleRef = useRef(null)
    const initialState: State = {
        markdownValue: '',
        loading: false
    }
    const [state, setState] = useState(initialState)

    function submit() {
        if (titleRef.current.value.length === 0) {
            message.warning('标题不能为空')
            return
        }
        if (state.markdownValue.length === 0) {
            message.warning('内容不能为空')
            return
        }
        setState((prevState) => {
            return {
                ...prevState,
                loading: true
            }
        })
        const params = props.match.params
        if (params.id) {
            putTopic(params.id, titleRef.current.value, state.markdownValue)
                .then((res) => {
                    message.success('修改成功，1s后跳到首页')
                    props.history.push('/')
                })
                .catch(() => {
                    setState((prevState) => {
                        return {
                            ...prevState,
                            loading: true
                        }
                    })
                })
        } else {
            postTopic(titleRef.current.value, state.markdownValue)
                .then((res) => {
                    props.history.push('/')
                })
                .catch(() => {
                    setState((prevState) => {
                        return {
                            ...prevState,
                            loading: false
                        }
                    })
                })
        }
    }

    function bodyChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const markdownValue = event.target.value
        setState((prevState) => {
            return {
                ...prevState,
                markdownValue
            }
        })
    }

    function onFileChange(info: UploadChangeParam) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList)
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} 上传成功`)
            imgUrl = info.file.response.data.url
            const markdownUrl = `![](${config.baseUrl}${imgUrl})`
            setState((prevState) => {
                return {
                    ...prevState,
                    markdownValue: state.markdownValue + markdownUrl
                }
            })
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败.`)
        }
    }

    useEffect(() => {
        const id = props.match.params.id
        if (id) {
            getTopicDetail(id).then((res) => {
                setState({
                    markdownValue: res.data.data[0].text,
                    loading: false
                })
                titleRef.current.value = res.data.data[0].title
            })
        }
    }, [props.match.params.id])

    return (
        <div className={styles.topicEdit}>
            <header className='header'>
                <input
                    className='title'
                    type='text'
                    placeholder='请输入标题'
                    ref={titleRef}
                />
                <Upload
                    className='upload-img'
                    {...uploadProps}
                    onChange={onFileChange}>
                    <Button>
                        <Icon type='picture' /> 上传图片
                    </Button>
                </Upload>
                <Button type='primary' loading={state.loading} onClick={submit}>
                    保存
                </Button>
            </header>
            <div className='wrap'>
                <div className='edit-area'>
                    <textarea
                        value={state.markdownValue}
                        placeholder='请输入内容'
                        name=''
                        id=''
                        cols={30}
                        rows={10}
                        onChange={bodyChange}
                    />
                </div>
                <div className='edit-show markdown-body'>
                    <ReactMarkdown source={state.markdownValue} />
                </div>
            </div>
        </div>
    )
}
export default TopicEdit
