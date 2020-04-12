import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { handleToggleQuestion } from '../actions/questions'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component {
  handleLike = (e) => {
    e.preventDefault()

    const { dispatch, question, authedUser } = this.props 

    // dispatch(handleToggleQuestion({
    //   id: question.id,
    //   hasLiked: question.hasLiked,
    //   authedUser
    // }))
  }
  toParent = (e, id) => {
    e.preventDefault();
    this.props.history.push(`/question/${id}`)
  }
  
  render () {
    const { question } = this.props
    
    if (question === null) {
      return <p>This question does not exist.</p>
    }

    const {
      name, avatar, timestamp, text, hasLiked, likes, id, replies, parent
    } = question

    return (
      <Link to={`/question/${id}`} className='question'>
        <img
          src={avatar}
          alt={`Avatar of ${name}`}
          className='avatar'
        />
        <div className='question-info'>
          <div>
            <span>{name}</span>
            {parent && (
              <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
                Replying to @{parent.author}
              </button>
            )}
            <p>{text}</p>
          </div>
            <div className='question-icons'>
              <span>{replies !== 0 && replies}</span>
              <span>{likes !== 0 && likes}</span>
          </div>
        </div>
      </Link>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, { id }){
  const question = questions[id];
  const parentQuestion = question ? questions[question.replies] : null;
  

  return {
    authedUser,
    question: question
  };
}

export default withRouter(connect(mapStateToProps)(Question))