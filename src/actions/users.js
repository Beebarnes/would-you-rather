export const RECEIVE_USERS = 'RECEIVE_USERS'
export const UPDATE_USERS = 'UPDATE_USERS'
export const UPDATE_USER_QUESTIONS = 'UPDATE_USER_QUESTIONS'

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}

function updateUser(qid, answer, authedUser) {
  return {
    type: UPDATE_USERS,
    qid,
    answer,
    authedUser,
  }
}

export function handleUpdateUser (qid, answer, authedUser) {
  return (dispatch) => {
    dispatch(updateUser(qid, answer, authedUser))
  }
}

function updateUserQuestions (question) {
  return {
    type: UPDATE_USER_QUESTIONS,
    question
  }
}

export function handleUpdateUserQuestions (question) {
  return (dispatch) => {
    dispatch(updateUserQuestions(question))
  }
}