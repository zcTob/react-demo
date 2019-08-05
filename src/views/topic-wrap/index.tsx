import React, { useState, useEffect } from 'react'
import TopicList from '../../components/topic'
import styles from './index.scss'
import { getTopic, postLike } from '@http'
import Header from '../../components/header'
import Tags from '../../components/tags'
import { BackTop, message } from 'antd'

interface State {
    topicData: any[]
}

const TopicWrap = () => {
    const [topicData, setTopicData] = useState([])
    useEffect(() => {
        getTopic().then((res) => {
            const topicData = res.data.filter((v) => {
                if (v.deleted === false) {
                    return v
                }
            })
            setTopicData(topicData)
        })
    }, [])

    function handleLike(id, likeNum, index) {
        setTimeout(() => {
            postLike(id, likeNum).then(() => {
                let copyTopicData = topicData.concat()
                copyTopicData[index].like = ++copyTopicData[index].like
                setTopicData(copyTopicData)
                message.success('点赞成功')
            })
        }, 3000)
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
