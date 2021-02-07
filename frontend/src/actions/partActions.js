import axios from 'axios'
import { 
  PART_LIST_REQUEST, 
  PART_LIST_SUCCESS, 
  PART_LIST_FAIL, 
  PART_DETAILS_REQUEST, 
  PART_DETAILS_SUCCESS, 
  PART_DETAILS_FAIL,
  PART_DELETE_REQUEST,
  PART_DELETE_SUCCESS,
  PART_DELETE_FAIL,
  PART_CREATE_FAIL,
  PART_CREATE_SUCCESS,
  PART_CREATE_REQUEST,
  PART_UPDATE_REQUEST,
  PART_UPDATE_SUCCESS,
  PART_UPDATE_FAIL,
} from '../constants/partConstants'

import { logout } from './userActions'

export const listParts = (keyword = '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({type: PART_LIST_REQUEST })

        const { data } = await axios.get(`/api/parts?keyword=${keyword}&pageNumber=${pageNumber}`)

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

export const deletePart = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PART_DELETE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      await axios.delete(`/api/parts/${id}`, config)
  
      dispatch({
        type: PART_DELETE_SUCCESS,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: PART_DELETE_FAIL,
        payload: message,
      })
    }
  }
  
  export const createPart = (part) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PART_CREATE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.post(`/api/parts`, part, config)
  
      dispatch({
        type: PART_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: PART_CREATE_FAIL,
        payload: message,
      })
    }
  }
  
  export const updatePart = (part) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PART_UPDATE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.put(
        `/api/parts/${part._id}`,
        part,
        config
      )
  
      dispatch({
        type: PART_UPDATE_SUCCESS,
        payload: data,
      })
      dispatch({ type: PART_DETAILS_SUCCESS, payload: data })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: PART_UPDATE_FAIL,
        payload: message,
      })
    }
  }
  