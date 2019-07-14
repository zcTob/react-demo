import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { reducers as rootReducer } from './rootReducer'
import thunk from 'redux-thunk'
const reducers = combineReducers({
  root: rootReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

export default store
