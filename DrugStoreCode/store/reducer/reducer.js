
export const pharmacy_id=(state=null,action)=>{
    switch(action.type){
        case 'pharmacy_ID':
            return action.payload
        default:
            return state
    }
}

export const U_ID=(state=null,action)=>{
    switch(action.type){
        case 'U_ID':
            return action.payload
        default:
            return state
    }
}
export const first=(state=null,action)=>{
    switch(action.type){
        case 'First':
            return action.payload
        default:
            return state
    }
}
export const last=(state=null,action)=>{
    switch(action.type){
        case 'Last':
            return action.payload
        default:
            return state
    }
}
export const cartItem=(state=null,action)=>{
    switch(action.type){
        case 'cart':
            return action.payload
        default:
            return state
    }
}
export const ChangePass=(state=false,action)=>{
  switch(action.type){
      case 'Change':
          return action.payload
      default:
          return state
  }
}
export const Email=(state=null,action)=>{
  switch(action.type){
      case 'email':
          return action.payload
      default:
          return state
  }
}
import { setCartLength } from "../action/action"
const initialState = {
  cartItemCount: 0, // number of items in the cart
}; 
import { SET_CART_LENGTH,ADD_TO_CART_SUCCESS,REMOVE_FROM_CART_SUCCESS } from "../action/action"
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART_LENGTH:
      return {
        ...state,
        cartItemCount: action.payload,
      };
      case ADD_TO_CART_SUCCESS:
        return {
          ...state,
          cartItemCount: state.cartItemCount + 1,
        };
      case REMOVE_FROM_CART_SUCCESS:
        return {
          ...state,
          cartItemCount: state.cartItemCount - 1,
        };
    default:
      return state;
  }
};

