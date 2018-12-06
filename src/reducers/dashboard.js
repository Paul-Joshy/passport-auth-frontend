import { DASHBOARD_GET_DATA } from '../actions/types';

const DEFAULT_STATE = {
  userDetails: {
    local: {
      email: ''
    },
    facebook: {},
    google: {},
    id: ''
  }
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case DASHBOARD_GET_DATA:
      return { ...state, userDetails: action.payload }
    default:
      return state
  }
}