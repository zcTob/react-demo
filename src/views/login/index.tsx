import React, { Component, RefObject, useRef } from 'react'
import { RouteComponentProps } from 'react-router'
import styles from './index.scss'
import axios from '@http'
import Header from '../../components/header'

type Props = RouteComponentProps

class Login1 extends Component<Props> {}

function Login(props) {
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)

    function submit() {
        const username = usernameRef.current.value
        const password = passwordRef.current.value
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
                props.history.push('/')
            })
    }

    return (
        <React.Fragment>
            <Header />
            <div className={styles.login}>
                <input
                    className='username'
                    ref={usernameRef}
                    type='text'
                    placeholder='username'
                />
                <input
                    className='password'
                    ref={passwordRef}
                    type='password'
                    placeholder='password'
                />
                <button className='submit' onClick={submit}>
                    登录
                </button>
            </div>
        </React.Fragment>
    )
}

export default Login
