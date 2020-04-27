import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authuser'
import { withRouter } from 'react-router-dom'

class Login extends Component {
  state = {
    user: '',
  }

  handleSelect = (e) => {
    
    const user = e.target.value
    
    this.setState({
      user
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    console.log(this.props)

    const { user } = this.state
    const { dispatch } = this.props

    dispatch(setAuthedUser(user))

    if(this.props.location.pathname.length > 8 && this.props.location.pathname !== '/leaderboard'){
      this.props.history.push('/')
    }
    
  }

  render() {
    const { users } = this.props
    const { user } = this.state

    return (
      <div>
        <h3 className='center'>Login</h3>
        <form className='new-question' onSubmit={this.handleSubmit}>
          <select onClick={this.handleSelect}>
            <option value=''>--Please choose a user--</option>
            {Object.values(users).map((user) => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
            <button 
              className='btn'
              type='submit'
              disabled={!user}
              >
            Submit
            </button>
        </form>
        {this.props.location.pathname.length > 8 && this.props.location.pathname !== '/leaderboard'
         ? <h3>404 - Route Not Found. Please Login</h3>
         : null
        }
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  return { users }
}

export default withRouter(connect(mapStateToProps)(Login));