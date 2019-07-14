import axios from '../../http'
import { loginIn, getCookie } from '../../utils'

export const GET_USER = 'GET_USER'
export const HANDLE_LOGIN = 'HANDLE_LOGIN'

export const actions = {
  handleLogin: (data) => {
    return (dispatch, getState) => {
      console.log(this)
      console.log(data, dispatch, getState())
      axios.post('/login', data).then((res) => {
        dispatch({
          type: HANDLE_LOGIN,
          name: data.username,
          logined: true
        })
      })
    }
  }
}

const defaultState = {
  name: getCookie('user'),
  logined: loginIn
}

export const reducers = (state = defaultState, actions) => {
  switch (actions.type) {
    case HANDLE_LOGIN:
      console.log('reducer', actions)
      const { name, logined } = actions
      return { ...state, name, logined }
    default:
      return state
  }
}
