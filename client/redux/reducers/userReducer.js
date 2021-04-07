const SET_IS_AUTH = 'SET_IS_AUTH'

const initialState = {
    user: {},
    isAuth: false
}

const mainReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_IS_AUTH:
            const {data, isAuth} = action.payload
            return {...state, user: {...data}, isAuth}
        default:
            return state
    }
}

export const setIsAuth = (data, isAuth) => ({type: SET_IS_AUTH, payload: {data, isAuth}})

export default mainReducer
