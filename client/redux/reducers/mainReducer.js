const HANDLE_DRAWER_TOGGLE = 'HANDLE_DRAWER_TOGGLE'
const SET_ACTIVE_ITEM = 'SET_ACTIVE_ITEM'

const initialState = {
  isOpen: false,
  activeItem: null
}

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_DRAWER_TOGGLE:
      return {
        ...state,
        isOpen: action.isOpen
      }
    case SET_ACTIVE_ITEM:
      return {
        ...state,
        activeItem: action.index
      }
    default:
      return state
  }
}

export const handleDrawerToggle = (isOpen) => ({type: HANDLE_DRAWER_TOGGLE, isOpen})
export const setActiveItem = (index) => ({type: SET_ACTIVE_ITEM, index})


export default mainReducer