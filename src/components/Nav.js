import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authuser'
import { NavLink } from 'react-router-dom'
import Gravatar from 'react-gravatar'

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
        <ul className='nav-list'>
          <li className='nav-list-item'>
            <NavLink to='/' exact className='nav-link' activeClassName='active'>
              HOME
            </NavLink>
          </li>
          <li className='nav-list-item'>
            <NavLink to='/new' className='nav-link' activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li className='nav-list-item'>
            <NavLink to='/leaderboard' className='nav-link' activeClassName='active'>
              Top Scores
            </NavLink>
          </li>
        </ul>
        {!user
        ? null
        : <ul className='nav-list'>
          <Gravatar className='avatar' email={users[authedUser].avatarURL} />
          <li className='nav-list-item'>
            {user.name}
          </li>
          <li className='nav-list-item'>
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