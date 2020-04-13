import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer
} from './_DATA.js'

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}

export function saveQuestion (optionOneText, OptionTwoText, Author) {
  return _saveQuestion(optionOneText, OptionTwoText, Author)
}

export function saveQuestionAnswer (qid, answer, authedUser) {
  return _saveQuestionAnswer(qid, answer, authedUser)
}