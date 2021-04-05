import { createWrapper } from 'next-redux-wrapper'
import { createStore, compose, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'

import rootReducer from './reducers/rootReducer'

const middleware = composeWithDevTools(applyMiddleware(thunk))

const makeStore = (context, initialState = {}) => createStore(rootReducer, initialState, middleware)

export const wrapper = createWrapper(makeStore, {debug: true})