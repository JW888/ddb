import axios from 'axios'
import { PART_LIST_REQUEST, PART_LIST_SUCCESS, PART_LIST_FAIL, PART_DETAILS_REQUEST, PART_DETAILS_SUCCESS, PART_DETAILS_FAIL} from '../constants/partConstants'

export const listParts = () => async (dispatch) => {
    try {
        dispatch({type: PART_LIST_REQUEST })

        const { data } = await axios.get('/api/parts')

        dispatch({
            type: PART_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PART_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message:error.message,
        })
    }

}

export const listPartDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: PART_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/parts/${id}`)

        dispatch({
            type: PART_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PART_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message:error.message,
        })
    }

}