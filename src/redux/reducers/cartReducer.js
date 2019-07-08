const CartReducer = (state = [], action) => {
    if( action.type === 'CART'){return [ ...state, ...action.payload];}
    if(action.type === 'CLEAR_CART'){return []}
    return state
  };
  export default CartReducer;
  
//   {id:1,card_name: 'misty rainforst', set: 'modern masters', price: 50 }