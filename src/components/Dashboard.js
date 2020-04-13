import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Dashboard extends Component {
  render () {
    const {questions, users, authedUser } = this.props

    let answeredQuestions = Object.keys(users[authedUser].answers)
    let unansweredQuestions = Object.keys(questions).filter((question) => !answeredQuestions.includes(question))

    if (answeredQuestions.length === 0){
      return (
        <p>No unanswered questions remain.</p>
      )
    }
    
    return (
      <div>
        <Question id={unansweredQuestions[0]}/>
      </div>
    )
  }
}

function mapStateToProps ({ questions, authedUser, users }) {
  return {
    questions,
    authedUser,
    users
  }
}

export default connect(mapStateToProps)(Dashboard)