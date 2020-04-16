import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleDecideQuestion } from '../actions/questions'
import { handleUpdateUser } from '../actions/users'
import { Link, withRouter } from 'react-router-dom'
import Gravatar from 'react-gravatar'

class Question extends Component {
  state = {
    answer: '',
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
    this.setState({
      ...this.state,
    })
    if (question){
      this.props.showAnswer(question.id);
    }
    
  }

  setAnswer = (e) => {
    this.setState({
      ...this.state,
      answer : e.target.id
    })
  }

  render () {

    const { question, users } = this.props
    
    if (question === null || question === undefined) {
      return <p>Out of fresh questions. Go make one up.</p>
    }
    
    const { author, optionOne, optionTwo, id } = question

    return (
      <Link to={`/question/${id}`}>
        <div className='card'>
          <header className='card-header'>
            <span>Would you rather...</span>
          </header>
          <form className='card-body'>
            <div className='gravatar'>
              <Gravatar email={users[author].avatarURL} />
            </div>
            
            <div className='options'>
              <div className='option' >
                <button onClick={this.setAnswer} value='optionOne'  id='optionOne'>{optionOne.text}</button>
              </div> 
              <div className='option or'>------OR------</div>
              <div className='option' >
                <button onClick={this.setAnswer} value='optionTwo' id='optionTwo'>{optionTwo.text}</button>
              </div>
            </div>
            <button onClick={this.decideQuestion} disabled={this.state.answer === ''} hidden={this.props.hideSubmit} >Submit</button>
          </form>
          <footer className='card-footer'>
            <span>From the mind of {users[author].name}</span>
          </footer>
        </div>
          
      </Link>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, { id, showAnswer }){
  let question
  if (questions[id]){
    question = questions[id]  
  } else {
    question = false;
  }

  console.log(question)
  

  return {
    authedUser,
    users,
    question,
    showAnswer
  };
}

export default withRouter(connect(mapStateToProps)(Question))