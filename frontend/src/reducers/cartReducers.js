import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_EDIT_ITEM} from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [], editItem: [] }, action) => {

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
        case CART_EDIT_ITEM:
            const editItem = action.payload
            console.log(editItem)
            return {
                ...state, editItem: editItem
            }

        case CART_REMOVE_ITEM:
            return {...state, cartItems: state.cartItems.filter((x) => x.part !== action.payload)}
        default:
            return state
    }
}