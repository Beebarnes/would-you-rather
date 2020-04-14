import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class Nav extends Component{

    

  
  render() {
    const { users, authedUser } = this.props
    const user = users[authedUser]
    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/all' activeClassName='active'>
              All Questions
            </NavLink>
          </li>
          <li>
            <NavLink to='/new' activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              Top Scores
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            {user.name}
          </li>
          <li>
            <NavLink to='/login' exact>
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    )
  }
  
}

function mapStateToProps ({ users, authedUser}) {
  return {
    users,
    authedUser
  }
}

export default connect(mapStateToProps)(Nav)