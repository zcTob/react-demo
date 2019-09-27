import React, { useState, useRef } from 'react'
import { RouteComponentProps } from 'react-router'
import styles from './index.scss'
import axios from '@http'

import Header from '../../components/header'
import { message, Button } from 'antd'

type Props = RouteComponentProps<{ id: string }>

function Register(props: Props) {
    const [loading, setLoading] = useState<boolean>(false)
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    const repasswordRef = useRef(null)

    function submit() {
        const username = usernameRef.current.value
        const password = passwordRef.current.value
        const repassword = repasswordRef.current.value
        if (username.length === 0 || password.length === 0) {
            message.warning('请输入账号密码')
            return
        }
        if (password !== repassword) {
            message.error('两次输入密码不一致')
            return
        }
        setLoading(true)
        axios
            .post('/register', {
                username,
                password
            })
            .then((data) => {
                message.success(data.data.data)
                message.success('3s后跳到登录页')
                setTimeout(() => {
                    props.history.push('/login')
                }, 3000)
            })
            .catch((err) => {
                if (err.code === 10001) {
                    username.current.value = ''
                    password.current.value = ''
                    repassword.current.value = ''
                    username.current.focus()
                }
                setTimeout(() => {
                    setLoading(false)
                }, 0)
            })
    }

    return (
        <React.Fragment>
            <Header />
            <div className={styles.register}>
                <input
                    className='username'
                    ref={usernameRef}
                    type='text'
                    placeholder='请输入账号'
                />
                <input
                    className='password'
                    ref={passwordRef}
                    type='password'
                    placeholder='请输入密码'
                />
                <input
                    className='password'
                    ref={repasswordRef}
                    type='password'
                    placeholder='请在次输入密码'
                />
                <Button
                    type='primary'
                    className='submit'
                    loading={loading}
                    onClick={submit}>
                    注册
                </Button>
            </div>
        </React.Fragment>
    )
}

export default Register
