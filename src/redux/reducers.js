import { GET_USER } from './contants'
import { loginIn, getCookie } from '../utils'
const defaultState = {
  user: {
    name: getCookie('user'),
    logined: loginIn()
  }
}

export default (state = defaultState, actions) => {
  switch (actions.type) {
    case GET_USER:
      return state.user
    default:
      return state
  }
}
