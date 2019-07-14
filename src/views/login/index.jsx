import React, { Component } from 'react'
import styles from './index.scss'
import Header from '../../components/header'
import { connect } from 'react-redux'
import { actions } from '../../redux/rootReducer'
import { Redirect } from 'react-router'
class Login extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.username = React.createRef()
    this.password = React.createRef()
    console.log(this)
  }
  async submit() {
    const username = this.username.current.value
    const password = this.password.current.value
    if (username.length === 0 || password.length === 0) {
      alert('请输入账号密码')
      return
    }
    this.props.onLogin({
      username,
      password
    })
  }

  render() {
    if (this.props.user.logined) {
      return <Redirect to='/' />
    }
    return (
      <React.Fragment>
        <Header />
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
      </React.Fragment>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    user: state.root
  }
}

export default connect(
  mapStatetoProps,
  { onLogin: actions.handleLogin }
)(Login)
