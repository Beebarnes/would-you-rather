import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Gravatar from 'react-gravatar'

class Answer extends Component {

  newQuestion = (e) => {
    this.props.history.push('/')
  }
    
  render () {

    const { optionOne, optionTwo, author, id } = this.props.question
    const { users, authedUser } = this.props
    const totalVotes = optionOne.votes.length + optionTwo.votes.length

    return (
      <div className='card'>
        <header className='card-header'>
          <span>Question from {users[author].name}</span>
        </header>
        <div className='card-body'>
          <div className='gravatar'>
            <Gravatar email={users[author].avatarURL} />
          </div>
          <div className='options'>
            <div className='option'>{`${optionOne.text} receives ${optionOne.votes.length} out of ${totalVotes} total
              votes or ${Math.floor(optionOne.votes.length * 100 / totalVotes)}%`}
              {users[authedUser].answers[id] === 'optionOne'
              ? <div> You chose this option</div>
              : null
              }
            </div>
            <div className='option'>{`${optionTwo.text} receives ${optionTwo.votes.length} out of ${totalVotes} total
              votes or ${Math.floor(optionTwo.votes.length * 100 / totalVotes)}%`}
              {users[authedUser].answers[id] === 'optionTwo'
              ? <div> You chose this option</div>
              : null
              }
            </div>
          </div>
          
        </div>
        <footer className='card-footer'>
          <button onClick={this.newQuestion} hidden={this.props.hideSubmit}>New Question</button>
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