import React, { Component, RefObject, useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { getTopicDetail, Comments } from '@http'
import ReactMarkdown from 'react-markdown'
import styles from './index.scss'
import Header from '../../components/header'
import Commnets from '../../components/comments'
import { loginIn } from '../../utils'

type Props = RouteComponentProps<{ id: string }>

interface State {
    title: string
    markdownValue: string
    comments: Comments[]
}

const TopicDetail = (props: Props) => {
    const initialState: State = {
        title: '',
        markdownValue: '',
        comments: []
    }
    const [state, setState] = useState(initialState)
    useEffect(() => {
        const params = props.match.params
        getTopicDetail(params.id).then((res) => {
            const data = res.data.data[0]
            setState({
                title: data.title,
                markdownValue: data.text,
                comments: data.comments
            })
        })
    }, [props.match.params])

    function handerEdit() {
        if (!loginIn()) {
            return
        }
        const params = props.match.params
        props.history.push(`/edit/${params.id}`)
    }

    return (
        <div className={styles.topicDetail}>
            <Header />
            <div className='td-con markdown-body'>
                <h1 className='title' onClick={handerEdit}>
                    {state.title}
                </h1>
                <ReactMarkdown source={state.markdownValue} />
                <div className='comments'>
                    <Commnets comments={state.comments} />
                </div>
            </div>
        </div>
    )
}

export default TopicDetail
