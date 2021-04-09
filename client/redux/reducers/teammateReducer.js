import { fetchTeammates } from '../../http/teammateAPI'

const SET_TEAMMATES = 'SET_TEAMMATES'

const initialState = {
    teammates: [],
}

const teammateReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_TEAMMATES:
            return {...state, teammates: [...action.teammates]}
        default:
            return state
    }
}

export const setTeammates = (teammates) => ({type: SET_TEAMMATES, teammates})

export const getTeammates = () => async (dispatch) => {
    const response = await fetchTeammates()
    dispatch(setTeammates(response))
}

export default teammateReducer
