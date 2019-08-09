import React, { useState, useEffect } from 'react'
import TopicList from '@components/topic'
import styles from './index.scss'
import { getTopic, postLike } from '@http'
import Header from '@components/header'
import Tags from '@components/tags'
import { BackTop, message } from 'antd'
import { OnLike } from '@components/topic/types'

function TopicWrap() {
    const [topicData, setTopicData] = useState([])
    useEffect(() => {
        getTopic().then((res) => {
            const topicData = res.data.data.filter((v) => {
                if (v.deleted === false) {
                    return v
                }
            })
            setTopicData(topicData)
        })
    }, [])

    const handleLike: OnLike = (id, likeNum, index) => {
        postLike(id, likeNum).then(() => {
            let copyTopicData = topicData.concat()
            copyTopicData[index].like = ++copyTopicData[index].like
            setTopicData(copyTopicData)
            message.success('点赞成功')
        })
    }

    return (
        <div className={styles.topicWrap}>
            <Header />
            <Tags />
            <BackTop visibilityHeight={0} />
            <section className={styles.topicCon}>
                <div className='mcontainer'>
                    {topicData.length
                        ? topicData.map((data, index) => (
                              <TopicList
                                  index={index}
                                  key={data._id}
                                  id={data._id}
                                  title={data.title}
                                  createTime={data.createTime}
                                  author={data.author}
                                  tag={1}
                                  likeNum={data.like}
                                  comments={data.comments}
                                  onLike={handleLike}
                              />
                          ))
                        : null}
                </div>
            </section>
        </div>
    )
}

export default TopicWrap
