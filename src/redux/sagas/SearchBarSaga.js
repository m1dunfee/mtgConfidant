import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getSuggestions(action) {
// console.log('getSuggestions hit',action.payload)
 const response = yield axios({
    method: 'get',
    url: '/localDB/autoFill',
    params:{string: action.payload}
  })
console.log(response.data)
// add a put do dispatch suggestions array to reducer
yield put({type:'SET_SUGGESTIONS', payload:response.data})
}


function* SearchBar() {
yield takeLatest('SearchBar', getSuggestions);
}

  export default (SearchBar);