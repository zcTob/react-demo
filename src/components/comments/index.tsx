import React, { Component } from 'react'
import styles from './index.scss'
import CommentInput from './commentInput'
import { withRouter, RouteComponentProps } from 'react-router'

interface Props extends RouteComponentProps<{ id: string }> {
    comments: object[]
}

const Comments = (props: Props) => {
    console.log(props.comments)
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
