import React, { Component } from 'react'
import { withRouter } from 'react-router'
import styles from './index.scss'
import logo from '../../logo.svg'
import { getCookie } from '../../utils'

class Header extends Component {
  state = {
    name: '登录',
    loginIn: false
  }
  constructor() {
    super()
    this.addClick = this.addClick.bind(this)
  }
  componentDidMount() {
    const name = getCookie('user')
    const loginIn = name ? true : false
    if (loginIn) {
      this.setState({
        loginIn,
        name: name
      })
    } else {
      this.setState({
        loginIn
      })
    }
  }
  addClick() {
    if (this.state.loginIn) {
      this.props.history.push('/edit')
    } else {
      this.props.history.push('/login')
    }
  }
  render() {
    return (
      <div className={styles.header}>
        <div className='icon'>
          <img src={logo} alt='avatar' />
        </div>
        <div className='name' onClick={this.addClick}>
          {this.state.name}
        </div>
        <div className='desc' />
      </div>
    )
  }
}

export default withRouter(Header)
