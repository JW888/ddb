import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'


export const addToCart = (id, qty, qtyOutstanding, dmReg, tail, location, trade, rdd) => async (dispatch, getState) => {
    
    const { data } = await axios.get(`/api/parts/${id}`)
    
    dispatch({
                type: CART_ADD_ITEM,
                payload: {
                    part: data._id,
                    name: data.item_name,
                    image: data.image,
                    partNumber: data.part_number,
                    niin: data.niin,
                    countInStock: data.countInStock,
                    qty,
                    qtyOutstanding,
                    dmReg,
                    tail,
                    location,
                    trade,
                    rdd,
                }
            })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))       
    
    
}

export const removeFromCart = (id) => (dispatch, getState) => {

    dispatch({
                type: CART_REMOVE_ITEM,
                payload: id,       
            })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))       
    
    
}

