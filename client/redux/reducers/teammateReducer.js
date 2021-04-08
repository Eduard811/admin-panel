const SET_TEAMMATES = 'SET_TEAMMATES'

const initialState = {
    teammates: [],
}

const teammateReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_TEAMMATES:
            return {...state, teammates: [...teammates]}
        default:
            return state
    }
}

export const setIsAuth = (teammates) => ({type: SET_TEAMMATES, teammates})

export default teammateReducer
