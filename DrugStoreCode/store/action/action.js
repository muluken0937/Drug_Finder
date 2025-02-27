export const pharmacyId=(name)=>{
    return {
        type:'pharmacy_ID',
        payload: name
    }
}

export const ID=(n)=>{
    return {
        type:'U_ID',
        payload: n
    }
}
export const Fname=(na)=>{
    return {
        type:'First',
        payload: na
    }
}
export const Lname=(nam)=>{
    return {
        type:'Last',
        payload: nam
    }
}
export const cartItems=(c)=>{
    return {
        type:'cart',
        payload: c
    }
}
export const isChanged=(Ch)=>{
    return {
        type:'Change',
        payload: Ch
    }
}
export const Uemail=(em)=>{
    return {
        type:'email',
        payload: em
    }
}

export const SET_CART_LENGTH = 'SET_CART_LENGTH';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const REMOVE_FROM_CART_SUCCESS = 'REMOVE_FROM_CART_SUCCESS';

export const setCartLength = (length) => ({
  type: SET_CART_LENGTH,
  payload: length,
});
export const addToCartSuccess = () => ({
    type: ADD_TO_CART_SUCCESS,
  });
  
  export const removeFromCartSuccess = () => ({
    type: REMOVE_FROM_CART_SUCCESS,
  });
  