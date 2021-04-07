const SET_IS_AUTH = 'SET_IS_AUTH'

const initialState = {
    user: null,
    isAuth: false
}

const mainReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_IS_AUTH:
            const {user, isAuth} = action.payload
            return {...state, user, isAuth}
        default:
            return state
    }
}

export const setIsAuth = (user, isAuth) => ({type: SET_IS_AUTH, payload: {user, isAuth}})

export default mainReducer
