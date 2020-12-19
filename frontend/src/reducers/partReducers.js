import { PART_LIST_REQUEST, PART_LIST_SUCCESS, PART_LIST_FAIL, PART_DETAILS_REQUEST, PART_DETAILS_SUCCESS, PART_DETAILS_FAIL} from '../constants/partConstants'


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



