import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleDecideQuestion } from '../actions/questions'
import { handleUpdateUser } from '../actions/users'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component {
  state = {
    answer: ''
  }
  
  decideQuestion = (e) => {
    e.preventDefault()

    const { dispatch, question, authedUser } = this.props 

    dispatch(handleDecideQuestion(
      question.id,
      this.state.answer,
      authedUser
    ))
    dispatch(handleUpdateUser(
      question.id,
      this.state.answer,
      authedUser
    ))
  }

  setAnswer = (e) => {
    console.log(e.target.id)
    this.setState({
      ...this.state,
      answer : e.target.id
    })
  }

  render () {

    const { question, users } = this.props
    
    if (question === null) {
      return <p>This question does not exist.</p>
    }
    
    const {
      author, optionOne, optionTwo
    } = question

    return (
      <div>
        <header>
          Would you rather...
        </header>
        <form onSubmit={this.decideQuestion}>
          <div>
            <div onClick={this.setAnswer} value={optionOne.text}  id='optionOne'>{optionOne.text}</div> 
            <div onClick={this.setAnswer} value={optionTwo.text} id='optionTwo'>{optionTwo.text}</div>
          </div>
          <button type='submit' >Submit</button>
        </form>
        
        <footer>
          From the mind of {users[author].name}
        </footer>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, { id }){
  const question = questions[id];  

  return {
    authedUser,
    users,
    question
  };
}

export default withRouter(connect(mapStateToProps)(Question))