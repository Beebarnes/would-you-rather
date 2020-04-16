import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import Answer from './Answer'

class Dashboard extends Component {
  state = {
    answerPreference: false,
    hideSubmit: true,
  }
  
  setUnansweredPreference = () => {
    this.setState({
      answerPreference: false
    })
  }

  setAnsweredPreference = () => {
    this.setState({
      answerPreference: true
    })
  }

  render() {
    const { questions, users, authedUser } = this.props

    let sortedQuestions = Object.keys(questions).sort( (a,b) => questions[b].timestamp - questions[a].timestamp)
    let answeredQuestions = Object.keys(users[authedUser].answers).sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    let unansweredQuestions = sortedQuestions.filter((question) => !answeredQuestions.includes(question))
    
    return (
      <div>
        <div className='header'>
          <h3 
            onClick={this.setUnansweredPreference} 
            className={!this.state.answerPreference ? 'active-preference' : 'header-item'}
          >Unanswered</h3>
          <h3 
            onClick={this.setAnsweredPreference} 
            className={this.state.answerPreference ? 'active-preference': 'header-item' }
          >Answered</h3>
        </div>
          <ul>
            {this.state.answerPreference
            ? answeredQuestions.length === 0
              ? <p>You've answered no questions</p>
              : answeredQuestions.map( (id) => (
              <li key={id}>
                <Answer id={id} hideSubmit={this.state.hideSubmit}/>
              </li>
              ))
            : unansweredQuestions.length === 0
              ? <p>You've answered all the questions.</p>
              : unansweredQuestions.map( (id) => (
              <li key={id}>
                <Question id={id} hideSubmit={this.state.hideSubmit} />
              </li>
              ))
            }
          </ul>
        
      </div>
    )
  }
}

function mapStateToProps ({ questions, users, authedUser }) {
  return {
    users,
    authedUser,
    questions
  }
}

export default connect(mapStateToProps)(Dashboard);