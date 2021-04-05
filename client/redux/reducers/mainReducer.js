const HANDLE_DRAWER_TOGGLE = 'HANDLE_DRAWER_TOGGLE'

const initialState = {
  isOpen: false,
  value: 0
}

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_DRAWER_TOGGLE:
      return {
        ...state,
        isOpen: action.isOpen
      }
    default:
      return state
  }
}

export const handleDrawerToggle = (isOpen) => ({type: HANDLE_DRAWER_TOGGLE, isOpen})


export default mainReducer