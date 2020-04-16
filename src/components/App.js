import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import NewQuestion from './NewQuestion'
import Login from './Login'
import LoadingBar from 'react-redux-loading-bar'
import QuestionPage from './QuestionPage'
import Nav from './Nav'
import Leaderboard from './Leaderboard'
import NotFound from './NotFound.js'

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
            {this.props.loadingBar.default
              ? null
              : this.props.authed
                  ? <div>
                      <Nav />
                      <Switch>
                        <Route path='/leaderboard' component={Leaderboard} />
                        <Route path='/' component={Login} />
                      </Switch>
                    </div>   
                  : <div>
                      <Nav />
                      <Switch>
                          <Route path='/' exact component={Dashboard} />
                          <Route path='/question/:question_id' exact component={QuestionPage} />
                          <Route path='/add' component={NewQuestion} />
                          <Route path='/login' component={Login} />
                          <Route path='/leaderboard' component={Leaderboard} />
                          <Route component={NotFound} />
                      </Switch> 
                    </div>
            }     
          </div>
        </Fragment>
      </Router>
      
    )
  }
}

function mapStateToProps ({ authedUser, loadingBar }) {
  return {
    authed: authedUser === null,
    loadingBar
  }
}

export default connect(mapStateToProps)(App)