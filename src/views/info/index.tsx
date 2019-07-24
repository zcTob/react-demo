import React, { Component } from 'react';
import styles from './index.scss';
import Header from '../../components/header';
import { Table, Divider, Tag, Popconfirm, message, Icon } from 'antd';
import axios from '../../http';
import { parseDate, getCookie } from '../../utils';

export default class Info extends Component {
    columns = [
        {
            title: 'title',
            dataIndex: 'title',
            key: 'title',
            render: (text, record, index) => {
                return <a href={`/detail/${record.key}`}>{text}</a>;
            }
        },
        {
            title: 'author',
            dataIndex: 'author',
            key: 'author'
        },
        {
            title: 'time',
            dataIndex: 'time',
            key: 'time'
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (tags) => {
                return (
                    <span>
                        {tags.map((tag) => {
                            let color = tag.length > 5 ? 'geekblue' : 'green';
                            if (tag === 'loser') {
                                color = 'volcano';
                            }
                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            );
                        })}
                    </span>
                );
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (
                <span>
                    <a href={`/edit/${record.key}`}>编辑</a>
                    <Divider type='vertical' />
                    <Popconfirm
                        title='确定删除吗?'
                        icon={
                            <Icon
                                type='question-circle-o'
                                style={{ color: 'red' }}
                            />
                        }
                        onConfirm={() => this.deleteList(record.key, index)}
                        okText='Yes'
                        cancelText='No'>
                        <a href='#'>删除</a>
                    </Popconfirm>
                </span>
            )
        }
    ];

    state = {
        data: null
    };

    deleteList = (key, index) => {
        axios.delete(`/topic/${key}`).then((res) => {
            const data = this.state.data.concat();
            data.splice(index, 1);
            this.setState({
                data
            });
            message.success('删除成功');
        });
    };

    componentDidMount() {
        let data = [];
        const user = getCookie('user');
        axios.get('/topic').then((res) => {
            console.log(res);
            res.data.forEach((v) => {
                data.push({
                    key: v._id,
                    title: v.title,
                    author: user,
                    time: parseDate(v.createTime),
                    tags: ['cool', 'teacher']
                });
            });
            this.setState({
                data
            });
        });
    }

    render() {
        return (
            <div className={styles.info}>
                <Header />
                <div className='list'>
                    <Table
                        columns={this.columns}
                        dataSource={this.state.data}
                    />
                </div>
            </div>
        );
    }
}
