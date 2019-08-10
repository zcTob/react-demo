import React, { Component } from 'react'
import styles from './index.scss'
import CommentInput from './commentInput'
import { Comments } from '@http'
import { withRouter, RouteComponentProps } from 'react-router'

interface Props extends RouteComponentProps<{ id: string }> {
    comments: Comments[]
}

const Comments = (props: Props) => {
    return (
        <div className={styles.comments}>
            <h3 className='title'>评论</h3>
            <CommentInput
                comments={props.comments}
                id={props.match.params.id}
            />
        </div>
    )
}

export default withRouter(Comments)
