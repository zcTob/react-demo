import React, { Component } from 'react'
import styles from './index.scss'
import Header from '../../components/header'
import { Table, Divider, Tag } from 'antd'
import axios from '../../http'
import { parseDate, getCookie } from '../../utils'

const data = [
  {
    key: '1',
    title: 'John Brown',
    author: 'zy',
    time: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    title: 'Jim Green',
    author: 'zy',
    time: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    title: 'Joe Black',
    author: 'zy',
    time: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]

export default class Info extends Component {
  columns = [
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record, index) => {
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
              if (tag === 'loser') {
                color = 'volcano'
              }
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
          <a onClick={() => this.deleteList(record.key, index)}>删除</a>
        </span>
      )
    }
  ]

  state = {
    data: null
  }

  deleteList = (key, index) => {
    console.log(key)

    axios.delete(`/topic/${key}`).then((res) => {
      console.log(res)
      const data = this.state.data.concat()
      data.splice(index, 1)
      this.setState({
        data
      })
    })
  }

  componentDidMount() {
    let data = []
    const user = getCookie('user')
    axios.get('/topic').then((res) => {
      console.log(res)
      res.data.forEach((v) => {
        data.push({
          key: v._id,
          title: v.title,
          author: user,
          time: parseDate(v.time),
          tags: ['cool', 'teacher']
        })
      })
      this.setState({
        data
      })
    })
  }

  render() {
    return (
      <div className={styles['info']}>
        <Header />
        <div className='list'>
          <Table
            align='center'
            columns={this.columns}
            dataSource={this.state.data}
          />
        </div>
      </div>
    )
  }
}
