import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* orderSaga(action) {
console.log('orderSaga hit')  
console.log(action.payload)
const response = yield axios({
    method: 'get',
    url:'/localDB/order_IDs',
})  

yield 
        action.payload.cart.map((item)=>{
            const newObject ={
                customer: action.payload.user,
                card_id: item.id,
                sales_date: null,
                total: null,
                paid: false ,
                active: true,
                order_ID: response.data[0].id,
            }
            console.log('newobject',newObject)
            return (axios({
                method: 'post',
                url: '/localDB/add_order',
                data: {
                    payload: newObject
                }
            }))
        })
    yield put({type:'CLEAR_CART', payload: []})

}
  

function* order_ID() {
yield takeLatest('ORDER_ID', orderSaga);
}

  export default (order_ID);