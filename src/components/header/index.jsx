import React, { Component } from 'react'
import { withRouter } from 'react-router'
import styles from './index.scss'
import logo from '../../logo.svg'

class Header extends Component {
  constructor() {
    super()
    this.addClick = this.addClick.bind(this)
  }
  addClick() {
    this.props.history.push('/edit')
  }
  render() {
    return (
      <div className={styles.header}>
        <div className='icon'>
          <img src={logo} alt='avatar' />
        </div>
        <div className='name' onClick={this.addClick}>
          添加
        </div>
        <div className='desc'>这是一个有故事的博客</div>
      </div>
    )
  }
}

export default withRouter(Header)
