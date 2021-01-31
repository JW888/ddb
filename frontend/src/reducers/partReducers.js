import { PART_LIST_REQUEST, 
    PART_LIST_SUCCESS, 
    PART_LIST_FAIL, 
    PART_DETAILS_REQUEST, 
    PART_DETAILS_SUCCESS, 
    PART_DETAILS_FAIL,
    PART_DELETE_REQUEST,
    PART_DELETE_SUCCESS,
    PART_DELETE_FAIL,
    PART_CREATE_RESET,
    PART_CREATE_FAIL,
    PART_CREATE_SUCCESS,
    PART_CREATE_REQUEST,
    PART_UPDATE_REQUEST,
    PART_UPDATE_SUCCESS,
    PART_UPDATE_FAIL,
    PART_UPDATE_RESET,


} from '../constants/partConstants'


export const partListReducer = (state = { parts: [] }, action) => {

    switch (action.type) {
        case PART_LIST_REQUEST:
            return { loading: true, parts: [] }
        case PART_LIST_SUCCESS:
            return { loading: false, parts: action.payload }
        case PART_LIST_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state
    }
}

export const partDetailsReducer = (state = { part: { comments: [] } }, action) => {

    switch (action.type) {
        case PART_DETAILS_REQUEST:
            return { loading: true, ...state }
        case PART_DETAILS_SUCCESS:
            return { loading: false, part: action.payload }
        case PART_DETAILS_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state
    }
}


export const partDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case PART_DELETE_REQUEST:
        return { loading: true }
      case PART_DELETE_SUCCESS:
        return { loading: false, success: true }
      case PART_DELETE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const partCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case PART_CREATE_REQUEST:
        return { loading: true }
      case PART_CREATE_SUCCESS:
        return { loading: false, success: true, part: action.payload }
      case PART_CREATE_FAIL:
        return { loading: false, error: action.payload }
      case PART_CREATE_RESET:
        return {}
      default:
        return state
    }
  }
  
  export const partUpdateReducer = (state = { part: {} }, action) => {
    switch (action.type) {
      case PART_UPDATE_REQUEST:
        return { loading: true }
      case PART_UPDATE_SUCCESS:
        return { loading: false, success: true, part: action.payload }
      case PART_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case PART_UPDATE_RESET:
        return { PART: {} }
      default:
        return state
    }
  }
  
