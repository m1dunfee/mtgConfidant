const SuggestionsReducer = (state = ['burrito'], action) => {
    if( action.type == 'SET_SUGGESTIONS'){return action.payload;}
    return state
  };
  
  // user will be on the redux state at:
  // state.user
  export default SuggestionsReducer;
  