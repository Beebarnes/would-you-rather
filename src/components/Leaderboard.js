import React, { Component } from 'react'
import { connect } from 'react-redux'
import Gravatar from 'react-gravatar'

class Leaderboard extends Component {
  
  render() {

    return (
      <div>
        <ul>
          {this.props.sortedScores.map( (user) => (
            <li className='card' key={user.id} id={user.id}>
              <div className='card-header'>{user.name}</div>
              <div className='card-body'>
                <div className='gravatar'>
                  <Gravatar email={user.avatarURL} />
                </div>
                <div className='options'>
                  <div className='option'>{Object.keys(user.answers).length > 0
                    ? `${Object.keys(user.answers).length} questions answered`
                    : 'No questions answered'
                  } 
                  </div>
                    <div className='option'>{user.questions.length} questions asked</div>
                    <div className='option'>{Object.keys(user.answers).length + user.questions.length > 0
                      ? `${Object.keys(user.answers).length + user.questions.length} total score` 
                      : 'No Score Achieved'
                  }
                  </div>
                </div>
                
              </div>
              
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
    const {id, name, questions, answers, avatarURL } = user
    return scores.push({id, score, name, questions, answers, avatarURL})
  } )

  let sortedScores = scores.sort( (a,b) => b.score - a.score)

  return {
    sortedScores
  }
}

export default connect(mapStateToProps)(Leaderboard);