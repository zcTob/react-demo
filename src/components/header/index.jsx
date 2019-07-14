import React, { Component } from 'react'
import { withRouter } from 'react-router'
import styles from './index.scss'
import { getCookie } from '../../utils'
import logo from '../../logo.svg'
import { Button, Avatar } from 'antd'
import { connect } from 'react-redux'

class Header extends Component {
  state = {
    name: '登录'
  }
  constructor(props) {
    super(props)
    this.handlerLogin = this.handlerLogin.bind(this)
    this.handlerRegister = this.handlerRegister.bind(this)
  }
  componentDidMount() {}

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

  renderLoginList = (name) => {
    return (
      <>
        <li>
          <a href='/edit'>
            <Button type='primary'>写文章</Button>
          </a>
        </li>
        <li>
          <a href='/info'>
            <Avatar>{name}</Avatar>
          </a>
        </li>
      </>
    )
  }

  render() {
    const { logined, name } = this.props.user
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
            {logined ? this.renderLoginList(name) : this.renderDefaultList()}
          </ul>
        </div>
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.root
  }
}

export default withRouter(connect(mapStateToProps)(Header))
