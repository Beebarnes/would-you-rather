import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authuser'
import { NavLink } from 'react-router-dom'

class Nav extends Component{

  handleSubmit = (e) => {
    e.preventDefault();

    const user = null;
    const { dispatch } = this.props

    dispatch(setAuthedUser(user))
    
  }

  
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
        {!user
        ? null
        : <ul>
          <li>
            {user.name}
          </li>
          <li>
            <button onClick={this.handleSubmit}>Logout</button>
          </li>
        </ul>
        }
        
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