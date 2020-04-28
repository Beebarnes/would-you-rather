import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class PrivateRoute extends Component {
  

  render() {
    const {component: Component, ...rest } = this.props

    return (
        <Route {...rest} render={(props) => (
          !this.props.authed
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: {from: props.location} }}/>
        )} />
      )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authed: authedUser === null
  }
}

export default connect(mapStateToProps)(PrivateRoute)
