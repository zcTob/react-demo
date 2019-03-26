import React, { Component } from 'react'
import styles from './index.scss'
import axios from '../../http'
export default class Login extends Component {
  constructor() {
    super()
    this.submit = this.submit.bind(this)
    this.username = React.createRef()
    this.password = React.createRef()
  }
  submit() {
    console.log(this.username)
    const username = this.username.current.value
    const password = this.password.current.value
    if (username.length === 0 || password.length === 0) {
      alert('请输入账号密码')
      return
    }
    axios
      .post('/login', {
        username,
        password
      })
      .then((res) => {
        if (res.status === 200) {
          alert('成功')
        }
      })
  }

  render() {
    return (
      <div className={styles.login}>
        <input
          className='username'
          ref={this.username}
          type='text'
          placeholder='username'
        />
        <input
          className='password'
          ref={this.password}
          type='password'
          placeholder='password'
        />
        <button className='submit' onClick={this.submit}>
          登录
        </button>
      </div>
    )
  }
}