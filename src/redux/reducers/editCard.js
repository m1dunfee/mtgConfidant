const EditCard = (state = 'misty rain', action) => {
    if( action.type === 'Edit_Card'){return action.payload;}
    return state
  };
  
  // user will be on the redux state at:
  // state.user
  export default EditCard;
  