const HANDLE_DRAWER_OPEN = 'HANDLE_DRAWER_OPEN'
const HANDLE_DRAWER_CLOSE = 'HANDLE_DRAWER_CLOSE'

const initialState = {
  isOpen: false
}

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_DRAWER_OPEN:
      return {
        ...state,
        isOpen: action.isOpen
      }
    case HANDLE_DRAWER_CLOSE:
      return {
        ...state,
        isOpen: action.isOpen
      }
    default:
      return state
  }
}

export const handleDrawerOpen = (isOpen) => ({
    type: HANDLE_DRAWER_OPEN, isOpen
})

export const handleDrawerClose = (isOpen) => ({
    type: HANDLE_DRAWER_OPEN, isOpen
})


export default mainReducer