import React, { Component } from 'react'
import styles from './index.scss'
import axios from '../../http'
import Header from '../../components/header'
import { message, Button } from 'antd'

export default class Register extends Component {
  state = {
    loading: false
  }
  username = React.createRef()
  password = React.createRef()
  password1 = React.createRef()

  submit = () => {
    const username = this.username.current.value
    const password = this.password.current.value
    const password1 = this.password1.current.value
    if (username.length === 0 || password.length === 0) {
      message.warning('请输入账号密码')
      return
    }
    if (password !== password1) {
      message.error('两次输入密码不一致')
      return
    }
    this.setState({
      loading: true
    })
    axios
      .post('/register', {
        username,
        password
      })
      .then((res) => {
        message.success(res.msg)
        message.success('3s后跳到登录页')
        setTimeout(() => {
          this.props.history.push('/login')
        }, 3000)
      })
      .catch((err) => {
        if (err.code === 10001) {
          this.username.current.value = ''
          this.password.current.value = ''
          this.password1.current.value = ''
          this.username.current.focus()
        }
        setTimeout(() => {
          this.setState({
            loading: false
          })
        }, 0)
      })
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className={styles.register}>
          <input
            className='username'
            ref={this.username}
            type='text'
            placeholder='请输入账号'
          />
          <input
            className='password'
            ref={this.password}
            type='password'
            placeholder='请输入密码'
          />
          <input
            className='password'
            ref={this.password1}
            type='password'
            placeholder='请在次输入密码'
          />
          <Button
            type='primary'
            className='submit'
            loading={this.state.loading}
            onClick={this.submit}>
            注册
          </Button>
        </div>
      </React.Fragment>
    )
  }
}
