import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
  

  
  render() {
    
    const { users, questions } = this.props

    console.log( users )

    let userArray = Object.values(users)
    userArray.map( (user) => {
      console.log(user.name)
      console.log(user.answers)
      console.log(user.questions)
    })

    return (
      <div>
        <ul>
          {Object.values(users).map( (user) => (
            <li key={user.id} id={user.id}>
              <div>{user.name}</div>
              <div>{Object.keys(user.answers).length > 0
              ? `${Object.keys(user.answers).length} questions answered`
              : 'No questions answered'
              } 
              </div>
              <div>{user.questions.length} questions asked</div>
              <div>{Object.keys(user.answers).length + user.questions.length > 0
              ? `${Object.keys(user.answers).length + user.questions.length} total score` 
              : 'No Score Achieved'
              }</div>
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