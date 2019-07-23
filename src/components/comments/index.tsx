import React, { Component } from 'react'
import styles from './index.scss'
import CommentInput from './commentInput'
import { withRouter } from 'react-router'
class Comments extends Component {
  render() {
    return (
      <div className={styles['comments']}>
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
