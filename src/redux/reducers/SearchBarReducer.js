import {combineReducers} from 'redux'


const SearchBarSuggestions = (state = [], action) => {
    if(action.type === 'SET_SUGGESTIONS'){return action.payload;}
    else{return state} 
    }

const SearchBarValue = (state = '', action) => {
    if(action.type === 'SET_VALUE'){return action.payload;}
    else{return state} 
    }
  
  // user will be on the redux state at:
  // state.user
  const SearchBarReducer = combineReducers({
    SearchBarSuggestions,
    SearchBarValue,
  });
  export default SearchBarReducer;