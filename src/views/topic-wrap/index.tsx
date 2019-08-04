import React, { Component, useState } from 'react'
import TopicList from '../../components/topic'
import styles from './index.scss'
import axios from '../../http'
import Header from '../../components/header'
import Tags from '../../components/tags'
import { BackTop, message } from 'antd'

interface State {
    topicData: any[]
}

const TopicWrap = () => {
    const [topicData, setTopicData] = useState([])

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
                                  like={data.like}
                                  comments={data.comments}
                                  onLike={this.topicLike}
                              />
                          ))
                        : null}
                </div>
            </section>
        </div>
    )
}

// class TopicWrap extends Component<{}, State> {
//     state = {
//         topicData: []
//     }
//     componentDidMount() {
//         axios.get('/topic').then((res) => {
//             const topicData = res.data.filter((v) => {
//                 if (v.deleted === false) {
//                     return v
//                 }
//             })
//             this.setState({
//                 topicData
//             })
//         })
//     }

//     topicLike = (id, like, index) => {
//         axios
//             .post('/like', {
//                 id,
//                 like
//             })
//             .then((res) => {
//                 const topicData = this.state.topicData.concat()
//                 topicData[index].like = ++topicData[index].like

//                 this.setState({
//                     topicData
//                 })
//                 message.success('点赞成功')
//             })
//     }

//     render() {
//         return (
//             <div className={styles.topicWrap}>
//                 <Header />
//                 <Tags />
//                 <BackTop visibilityHeight={0} />
//                 <section className={styles.topicCon}>
//                     <div className='mcontainer'>
//                         {this.state.topicData.map((data, index) => (
//                             <TopicList
//                                 index={index}
//                                 key={data._id}
//                                 id={data._id}
//                                 title={data.title}
//                                 createTime={data.createTime}
//                                 author={data.author}
//                                 tag={1}
//                                 like={data.like}
//                                 comments={data.comments}
//                                 onLike={this.topicLike}
//                             />
//                         ))}
//                     </div>
//                 </section>
//             </div>
//         )
//     }
// }

export default TopicWrap
