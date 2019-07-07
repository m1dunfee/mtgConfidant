const CartReducer = (state = [], action) => {
    if( action.type === 'CART'){return [ ...state, ...action.payload];}
    return state
  };
  export default CartReducer;
  
//   {id:1,card_name: 'misty rainforst', set: 'modern masters', price: 50 }