import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const DECIDE_QUESTION = 'DECIDE_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleAddQuestion (optionOneText, optionTwoText, author) {
  return (dispatch) => {

    dispatch(showLoading())

    return saveQuestion(
      optionOneText,
      optionTwoText,
      author
    )
      .then( (question) => dispatch(addQuestion(question)))
      .then( () => dispatch(hideLoading()))
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

function decideQuestion(qid, answer, authedUser) {
  return {
    type: DECIDE_QUESTION,
    qid,
    answer,
    authedUser,
  }
}

export function handleDecideQuestion (qid, answer, authedUser) {
  return (dispatch) => {
    dispatch(decideQuestion(qid, answer, authedUser))

    return saveQuestionAnswer(qid, answer, authedUser)
      .catch((e) => {
        console.warn('Error in handleToggleQuestion: ', e)
        dispatch(decideQuestion(qid, answer, authedUser))
        alert('There was an error liking the question. Try again')
      })
  }
}