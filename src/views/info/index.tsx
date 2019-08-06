import React, { Component, useState, useEffect } from 'react'
import styles from './index.scss'
import Header from '../../components/header'
import { Table, Divider, Tag, Popconfirm, message, Icon } from 'antd'
import axios from '@http'
import { parseDate, getCookie } from '../../utils'

const Info = () => {
    const [state, setState] = useState({
        data: null
    })

    const deleteList = (key, index) => {
        axios.delete(`/topic/${key}`).then((res) => {
            const data = state.data.concat()
            const selectData = data.splice(index, 1)
            if (selectData[0].tags.indexOf('deleted') !== -1) {
                return
            }

            selectData[0].tags.push('deleted')
            data.push(selectData[0])
            setState({
                data
            })
            message.success('删除成功')
        })
    }

    const columns = [
        {
            title: 'title',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => {
                return <a href={`/detail/${record.key}`}>{text}</a>
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
                            let color = tag.length > 5 ? 'geekblue' : 'green'
                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            )
                        })}
                    </span>
                )
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
                        onConfirm={() => deleteList(record.key, index)}
                        okText='Yes'
                        cancelText='No'>
                        <a href='#'>删除</a>
                    </Popconfirm>
                </span>
            )
        }
    ]

    useEffect(() => {
        let data = []
        const user = getCookie('user')
        axios.get('/topic').then((res) => {
            res.data.data.forEach((v) => {
                let tags = []
                v.deleted ? tags.push('deleted') : null
                tags.length === 0 ? tags.push('null') : null
                data.push({
                    key: v._id,
                    title: v.title,
                    author: user,
                    time: parseDate(v.createTime),
                    tags: tags
                })
            })
            setState({
                data
            })
        })
    }, [])

    return (
        <div className={styles.info}>
            <Header />
            <div className='list'>
                <Table columns={columns} dataSource={state.data} />
            </div>
        </div>
    )
}

export default Info
