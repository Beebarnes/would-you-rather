import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'


class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    author: this.props.authedUser,
    toHome: false
  }

  handleChange = (e) => {
    
    const text = e.target.value
    const name = e.target.name

    this.setState({
      ...this.state,
      [name]: text
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { optionOneText, optionTwoText, author } = this.state
    const { dispatch } = this.props

    dispatch(handleAddQuestion(optionOneText, optionTwoText, author))
    
    this.setState( () => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: true
    }))

  }

  render() {
    const { optionOneText, optionTwoText, toHome } = this.state

    if (toHome) {
      return <Redirect to='/' /> 
    }
    
    return (
      
      <div>
        <h3 className='center'>Compose New Question</h3>
        <form className='new-question' onSubmit={this.handleSubmit}>
          <input
            placeholder="Option 1"
            value={optionOneText}
            onChange={this.handleChange}
            maxLength={50}
            name='optionOneText'
          />
          <input 
            placeholder="Option 2"
            value={optionTwoText}
            onChange={this.handleChange}
            maxLength={50}
            name='optionTwoText'
          />
          <button 
            className='btn'
            type='submit'
            disabled={optionOneText === '' || optionTwoText === '' }
          >
          Submit
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {authedUser}
}

export default connect(mapStateToProps)(NewQuestion);