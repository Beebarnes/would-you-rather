import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import Answer from './Answer'

class QuestionPage extends Component {
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

  render () {
    const {questions, users, authedUser } = this.props

    let answeredQuestions = Object.keys(users[authedUser].answers) || []
    let unansweredQuestions = Object.keys(questions).filter((question) => !answeredQuestions.includes(question))

    const currentQuestion = unansweredQuestions[unansweredQuestions.indexOf(this.props.match.params.question_id)]

    console.log(currentQuestion)
    
    
    return (
      <div>
        {this.state.showAnswered
        ? <Answer id={this.state.previouslyAnswered} />
        : <Question id={currentQuestion} showAnswer={this.showAnswer}/>
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

export default connect(mapStateToProps)(QuestionPage)