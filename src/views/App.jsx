import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from '../components/header'
import Footer from '../components/footer'
import TopicWrap from './topic-wrap'
import TopicDetail from './topic-detail'
import TopicEdit from './topic-edit'
import Login from './login'
import styles from './App.scss'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <div className={styles.wrap}>
            <Switch>
              <Route path='/' exact component={TopicWrap} />
              <Route path='/detail/:id' component={TopicDetail} />
              <Route path='/edit' component={TopicEdit} />
              <Route path='/login' component={Login} />
            </Switch>
          </div>
          <Footer />
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

export default App
