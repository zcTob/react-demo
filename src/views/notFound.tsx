import { Result, Button } from 'antd';

import React, { Component } from 'react';
import Header from '../components/header';
const StatusMap = {
    '404': {
        title: '404',
        subTitle: 'Sorry, the page you visited does not exist.',
        extra: (
            <Button type='primary'>
                <a href='/'>Back Home</a>
            </Button>
        )
    }
};

export default class NotFound extends Component {
    state = {
        status: '404'
    };
    render() {
        const { status } = this.state;
        const resultProps = StatusMap[status];
        return (
            <div>
                <Header />
                <Result status={status} {...resultProps} />
            </div>
        );
    }
}
