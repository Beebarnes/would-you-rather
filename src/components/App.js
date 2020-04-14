import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard.js'
import NewQuestion from './NewQuestion'
import Login from './Login'
import LoadingBar from 'react-redux-loading'
import QuestionPage from './QuestionPage'
import Nav from './Nav'
import Leaderboard from './Leaderboard'

class App extends Component {
  componentDidMount () {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar/>
          <div className='container'>
            {this.props.loading === true
              ? <Route path='/' component={Login} />
              : <div>
                  <Nav />
                  <div>
                      <Route path='/' exact component={Dashboard} />
                      <Route path='/all' component={QuestionPage} />
                      <Route path='/new' component={NewQuestion} />
                      <Route path='/login' component={Login} />
                      <Route path='/leaderboard' component={Leaderboard} />
                  </div> 
                </div>
                }
          </div>
        </Fragment>
      </Router>
      
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)