import { RECEIVE_QUESTIONS, DECIDE_QUESTION, ADD_QUESTION } from '../actions/questions'

export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case DECIDE_QUESTION :
      return {
        ...state,
        [action.qid] : {
          ...state[action.qid],
          [action.answer] : {
            ...state[action.answer.votes],
            votes : state[action.qid][action.answer].votes.concat([action.authedUser]),
            text : state[action.qid][action.answer].text
          }
        }
      }
    case ADD_QUESTION :
      const { question } = action;
      
      return {
        ...state,
        [question.id]: question
      }
    default :
      return state
  }
}

