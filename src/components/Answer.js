import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleDecideQuestion } from '../actions/questions'
import { handleUpdateUser } from '../actions/users'
import { Link, withRouter } from 'react-router-dom'

class Answer extends Component {
    
  render () {
    console.log(this.props.users)

    const { optionOne, optionTwo, author } = this.props.question
    const users = this.props.users
    console.log(users)
    const totalVotes = optionOne.votes.length + optionTwo.votes.length
    
    return (
      <div>
        <header>
          <p>Question from {users[author].name}</p>
        </header>
        <div>
          <div>{`${optionOne.text} receives ${optionOne.votes.length} out of ${totalVotes} total votes`}</div>
          <div>{`${optionTwo.text} receives ${optionTwo.votes.length} out of ${totalVotes} total votes`}</div>
        </div>
        <footer>
          <button onClick={this.props.newQuestion}>New Question</button>
        </footer>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, { id }){
  const question = questions[id]  

  return {
    authedUser,
    users,
    question
  };
}

export default withRouter(connect(mapStateToProps)(Answer))