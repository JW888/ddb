import { CART_ADD_ITEM, CART_REMOVE_ITEM} from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {

    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.part === item.part)

            if (existItem) {
                return {
                    ...state, cartItems: state.cartItems.map(x => x.part === existItem.part ? item : x)
                }
            } else {
                return {
                    ...state, cartItems:[...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM:
            return {...state, cartItems: state.cartItems.filter((x) => x.part !== action.payload)}

        default:
            return state
    }


}