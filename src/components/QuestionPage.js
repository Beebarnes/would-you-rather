import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class QuestionPage extends Component {
  state = {
    answerPreference: this.UNANSWERED
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
    
    let answeredQuestions = Object.keys(users[authedUser].answers)
    let unansweredQuestions = Object.keys(questions).filter((question) => !answeredQuestions.includes(question))

    return (
      <div>
        <h3 className='center' onClick={this.setUnansweredPreference} >Unanswered</h3>
        <h3 className='center' onClick={this.setAnsweredPreference} >Answered</h3>
        {this.state.answerPreference === this.ANSWERED 
          ? answeredQuestions.map( (id) => (
            <li key={id}>
              <Question id={id}/>
            </li>
            ))
          : unansweredQuestions.map( (id) => (
            <li key={id}>
              <Question id={id}/>
            </li>
            ))
        }
      </div>
    )
  }
}

function mapStateToProps ({ questions, users, authedUser }) {
  return {
    questions,
    users,
    authedUser
  }
}

export default connect(mapStateToProps)(QuestionPage);