import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
  state = {
    topScores : []
  }

  render() {

    return (
      <div>
        <ul>
          {this.props.sortedScores.map( (user) => (
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

function mapStateToProps ({ users }) {

  let scores = []

  Object.values(users).map( (user) => {
    let score = Object.keys(user.answers).length + user.questions.length
    let id = user.id
    let userName = user.name
    let questions = user.questions
    let answers = user.answers
    scores.push({id, score, userName, questions, answers})
  } )

  let sortedScores = scores.sort( (a,b) => b.score - a.score)

  console.log(sortedScores)

  return {
    sortedScores
  }
}

export default connect(mapStateToProps)(Leaderboard);