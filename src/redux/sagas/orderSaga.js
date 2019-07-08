import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


// getOrderID =()=>{
//     axios({
//         method: 'get',
//         url:'/localDB/order_IDs',
//     }).then((response)=>{
//         console.log("getOrderID",response.data[0].id)
//         return response.data[0].id
//     })
// }

// processOrder =(order_ID)=>{
//     console.log('processOrder',order_ID)
//     this.props.reduxState.CartReducer.map((item)=>{
//         const newObject ={
//             customer: this.props.reduxState.user.id,
//             card_id: item.id,
//             sales_date: null,
//             total: null,
//             paid: false ,
//             active: true,
//             order_ID: order_ID,
//         }
//         console.log('newobject',newObject)
//         return (axios({
//             method: 'post',
//             url: '/localDB/add_order',
//             data: {
//                 payload: newObject
//             }
//         }))
//     })
// }

function* orderSaga() {
console.log('orderSaga hit')  
yield axios({
    method: 'get',
    url:'/localDB/order_IDs',
}).then((response)=>{
        console.log("getOrderID",response.data[0].id)
        put({type: 'SET_ORDER_ID', payload: response.data[0].id})
        
    })    
// yield 
//         this.props.reduxState.CartReducer.map((item)=>{
//             const newObject ={
//                 customer: this.props.reduxState.user.id,
//                 card_id: item.id,
//                 sales_date: null,
//                 total: null,
//                 paid: false ,
//                 active: true,
//                 order_ID: order_ID,
//             }
//             console.log('newobject',newObject)
//             return (axios({
//                 method: 'post',
//                 url: '/localDB/add_order',
//                 data: {
//                     payload: newObject
//                 }
//             }))
//         })

}
  

function* order_ID() {
yield takeLatest('ORDER_ID', orderSaga);
}

  export default (order_ID);