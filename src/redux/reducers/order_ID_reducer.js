const order_ID_reducer = (state = 0, action) => {
    if( action.type === 'SET_ORDER_ID'){return action.payload;}
    return state
  };
  
  export default order_ID_reducer