import React, { Component } from 'react'
import Login from './Login'




class NotFound extends Component {

  render() {
    return (
      <div>
        <Login />
        <h3>Page Not Found. Login to continue</h3>
      </div>
    )
  }
}


export default (NotFound);