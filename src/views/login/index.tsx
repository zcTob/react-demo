import React, { Component, RefObject } from 'react';
import { RouteComponentProps } from 'react-router';
import styles from './index.scss';
import axios from '../../http';
import Header from '../../components/header';

interface Props extends RouteComponentProps {}

export default class Login extends Component<Props> {
    username: RefObject<HTMLInputElement> = React.createRef();
    password: RefObject<HTMLInputElement> = React.createRef();

    submit = () => {
        const username = this.username.current.value;
        const password = this.password.current.value;
        if (username.length === 0 || password.length === 0) {
            alert('请输入账号密码');
            return;
        }
        axios
            .post('/login', {
                username,
                password
            })
            .then((res) => {
                this.props.history.push('/');
            });
    };

    render() {
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
        );
    }
}
