import {combineReducers} from 'redux'
import userReducer from './userReducer'
import teammateReducer from './teammateReducer'


export default combineReducers({
    user: userReducer,
    teammate: teammateReducer
})