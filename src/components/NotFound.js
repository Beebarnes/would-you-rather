import React, { Component } from 'react'
import { Link } from 'react-router-dom'




class NotFound extends Component {

  render() {
    return (
      <div>
        <h3>Route not Found.</h3>
        <Link to='/'>Click here to return home.</Link>
      </div>
    )
  }
}


export default (NotFound);