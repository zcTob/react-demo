import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router'
import axios from '../../http'
import ReactMarkdown from 'react-markdown'
import styles from './index.scss'
import Header from '../../components/header'
import Commnets from '../../components/comments'
import { loginIn } from '../../utils'

type Props = RouteComponentProps<{ id: string }>

interface State {
    title: string
    markdownValue: string
    comments: object[]
}

export default class TopicDetail extends Component<Props, State> {
    markdown
    constructor(props) {
        super(props)
        this.markdown = React.createRef()
        this.state = {
            title: '',
            markdownValue: '',
            comments: []
        }
        this.handerEdit = this.handerEdit.bind(this)
    }
    componentDidMount() {
        const params = this.props.match.params
        axios.get(`/topic/${params.id}`).then((res) => {
            const data = res.data[0]
            this.setState({
                title: data.title,
                markdownValue: data.text,
                comments: data.comments
            })
        })
    }

    handerEdit() {
        if (!loginIn()) {
            return
        }
        const params = this.props.match.params
        this.props.history.push(`/edit/${params.id}`)
    }

    render() {
        return (
            <div className={styles.topicDetail}>
                <Header />
                <div className='td-con markdown-body'>
                    <h1 className='title' onClick={this.handerEdit}>
                        {this.state.title}
                    </h1>
                    <ReactMarkdown source={this.state.markdownValue} />
                    <div className='comments'>
                        <Commnets comments={this.state.comments} />
                    </div>
                </div>
            </div>
        )
    }
}
