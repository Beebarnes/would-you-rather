import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
  

  
  render() {
    
    const { users, questions } = this.props

    console.log( users )

    return (
      <div>
        <ul>
          {Object.values(users).map( (user) => (
            <li key={user.id} id={user.id}>
              <div>{user.name}</div>
              <div>{user.answers.length > 0
              ? `${user.answers.length} questions answered`
              : 'No questions answered'
              } 
              </div>
              <div>{user.questions.length} questions asked</div>
            </li>
          ))}
        </ul>
        
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

export default connect(mapStateToProps)(Leaderboard);