import { RECEIVE_USERS, UPDATE_USERS, UPDATE_USER_QUESTIONS } from '../actions/users'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
    case UPDATE_USERS : 
      return {
        ...state,
        [action.authedUser] : {
          ...state[action.authedUser],
          answers : {
            ...state[action.authedUser].answers,
            [action.qid] : action.answer
          }
        }
      }
    case UPDATE_USER_QUESTIONS :
      return {
        ...state,
        [action.question.question.author] : {
          ...state[action.question.question.author],
          questions : state[action.question.question.author].questions.concat([action.question.question.id]),

          
        }
      }
    default :
      return state
  }
}