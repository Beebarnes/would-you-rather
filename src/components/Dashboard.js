import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import Answer from './Answer'

class Dashboard extends Component {
  state = {
    answerPreference: this.UNANSWERED,
    hideSubmit: true
  }

  UNANSWERED = 'UNANSWERED'
  ANSWERED = 'ANSWERED'

  setUnansweredPreference = () => {
    this.setState({
      answerPreference: this.UNANSWERED
    })
  }

  setAnsweredPreference = () => {
    this.setState({
      answerPreference: this.ANSWERED
    })
  }

  render() {
    const { questions, users, authedUser } = this.props

    let sortedQuestions = Object.keys(questions).sort( (a,b) => questions[b].timestamp - questions[a].timestamp)
    let answeredQuestions = Object.keys(users[authedUser].answers)
    let unansweredQuestions = sortedQuestions.filter((question) => !answeredQuestions.includes(question))
    
    
    return (
      <div>
        <h3 className='center' onClick={this.setUnansweredPreference} >Unanswered</h3>
        <h3 className='center' onClick={this.setAnsweredPreference} >Answered</h3>
        {this.state.answerPreference === this.ANSWERED 
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