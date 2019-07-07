import React, { Component } from 'react'
import { withRouter } from 'react-router'
import styles from './index.scss'
import { getCookie } from '../../utils'
import logo from '../../logo.svg'
import { Button, Avatar } from 'antd'
class Header extends Component {
  state = {
    name: '登录',
    loginIn: false
  }
  constructor(props) {
    super(props)
    this.handlerLogin = this.handlerLogin.bind(this)
    this.handlerRegister = this.handlerRegister.bind(this)
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

  handlerLogin() {
    this.props.history.push('/login')
  }

  handlerRegister() {
    this.props.history.push('/register')
  }

  renderDefaultList = () => {
    return (
      <>
        <li className='login cursor' onClick={this.handlerLogin}>
          登录
        </li>
        <li className='register cursor' onClick={this.handlerRegister}>
          注册
        </li>
      </>
    )
  }

  renderLoginList = () => {
    return (
      <>
        <li>
          <a href='/edit'>
            <Button type='primary'>写文章</Button>
          </a>
        </li>
        <li>
          <a href='/info'>
            <Avatar>U</Avatar>
          </a>
        </li>
      </>
    )
  }

  render() {
    return (
      <header className={styles.header}>
        <div className='wrap mcontainer'>
          <a className='logo' href='/'>
            <img className='cursor' src={logo} alt='logo' />
          </a>
          <ul className='tools'>
            <li className='search'>
              <input type='search' placeholder='搜索' maxLength={32} />
            </li>
            {this.state.loginIn
              ? this.renderLoginList()
              : this.renderDefaultList()}
          </ul>
        </div>
      </header>
    )
  }
}

export default withRouter(Header)
