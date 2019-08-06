import React, { Component, useState, useEffect } from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import styles from './index.scss'
import { getCookie } from '../../utils'
import logo from '../../logo.svg'
import { Button, Avatar } from 'antd'

type Props = RouteComponentProps

const Header = (props: Props) => {
    const [state, setState] = useState({ name: '登录', loginIn: false })
    useEffect(() => {
        const name = getCookie('user')
        const loginIn = name ? true : false
        if (loginIn) {
            setState({
                loginIn,
                name
            })
        } else {
            setState((prevState) => {
                return {
                    ...prevState,
                    loginIn
                }
            })
        }
    }, [])

    function handlerLogin() {
        props.history.push('/login')
    }

    function handlerRegister() {
        props.history.push('/register')
    }

    const renderDefaultList = () => {
        return (
            <>
                <li className='login cursor' onClick={handlerLogin}>
                    登录
                </li>
                <li className='register cursor' onClick={handlerRegister}>
                    注册
                </li>
            </>
        )
    }

    const renderLoginList = () => {
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

    return (
        <header className={styles.header}>
            <div className='wrap mcontainer'>
                <a className='logo' href='/'>
                    <img className='cursor' src={logo} alt='logo' />
                </a>
                <ul className='tools'>
                    <li className='search'>
                        <input
                            type='search'
                            placeholder='搜索'
                            maxLength={32}
                        />
                    </li>
                    {state.loginIn ? renderLoginList() : renderDefaultList()}
                </ul>
            </div>
        </header>
    )
}

export default withRouter(Header)
