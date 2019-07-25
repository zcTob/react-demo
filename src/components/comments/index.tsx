import React, { Component } from 'react'
import styles from './index.scss'
import CommentInput from './commentInput'
import { withRouter, RouteComponentProps } from 'react-router'

interface Props extends RouteComponentProps<{ id: string }> {
    comments: object[]
}

class Comments extends Component<Props> {
    render() {
        return (
            <div className={styles.comments}>
                <h3 className='title'>评论</h3>
                <CommentInput
                    comments={this.props.comments}
                    id={this.props.match.params.id}
                />
            </div>
        )
    }
}

export default withRouter(Comments)
