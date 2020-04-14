import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import Answer from './Answer'

class Dashboard extends Component {
  state = {
    showAnswered: false,
    previouslyAnswered: ''
  }
  
  showAnswer = (qid) => {
    this.setState({
      showAnswered: true,
      previouslyAnswered: qid
    })
  }

  newQuestion = () => {
    this.setState({
      showAnswered: false
    })
  }

  render () {
    const {questions, users, authedUser } = this.props

    let answeredQuestions = Object.keys(users[authedUser].answers) || []
    let unansweredQuestions = Object.keys(questions).filter((question) => !answeredQuestions.includes(question))
    
    return (
      <div>
        {this.state.showAnswered
        ? <Answer id={this.state.previouslyAnswered} newQuestion={this.newQuestion} />
        : <Question id={unansweredQuestions[0]} showAnswer={this.showAnswer}/>
        }
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