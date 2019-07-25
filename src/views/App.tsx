import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import 'normalize.css'
import 'github-markdown-css/github-markdown.css'
import Footer from '../components/footer'
import TopicWrap from './topic-wrap'
import TopicDetail from './topic-detail'
import TopicEdit from './topic-edit'
import Login from './login'
import Info from './info'
import './App.scss'
import ErrorBoundary from './Error'
import Register from './register'
import notFound from './notFound'
class App extends Component {
    render() {
        return (
            <div className='app'>
                <ErrorBoundary>
                    <Switch>
                        <Route path='/' exact component={TopicWrap} />
                        <Route path='/detail/:id' component={TopicDetail} />
                        <Route path='/edit' exact component={TopicEdit} />
                        <Route path='/edit/:id' component={TopicEdit} />
                        <Route path='/login' component={Login} />
                        <Route path='/register' component={Register} />
                        <Route path='/info' component={Info} />
                        <Route component={notFound} />
                    </Switch>
                </ErrorBoundary>
                <Footer />
            </div>
        )
    }
}

export default App
