import { combineReducers, applyMiddleware } from 'redux'
import app from './modules/app/reducer'
// import permission from './modules/permission/reducer'
// import user from './modules/user/reducer'

const reducer = combineReducers({
  app
  // user,
  // permission
})
