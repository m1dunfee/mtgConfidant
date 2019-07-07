import React, {Component} from 'react'; 
import {connect} from 'react-redux';
import axios from 'axios';


class Checkout extends Component{

    removeFromCart=(id)=>{
        for(let i=0; i< this.props.reduxState.CartReducer.length; ++i){
            if(this.props.reduxState.CartReducer[i].id===id){
                return this.props.reduxState.CartReducer.splice(i,1)
            }
        }
    }


    checkoutOrder =()=>{
        console.log('checkoutOrder clicked')
//         const cardList =[];
// console.log(this.props.reduxState.CartReducer)


//         this.props.reduxState.CartReducer.forEach((card)=>{
//             return cardList.push(card.card_name)
//         })
        
//             const newObject ={
//                 customer: this.props.reduxState.user.id,
//                 card_id: cardList,
//                 sales_date: null,
//                 total: null,
//                 paid: false ,
//                 active: true,
//             }
//             console.log('newobject',newObject)
//             return (axios({
//                 method: 'post',
//                 url: '/localDB/add_order',
//                 data: {
//                     payload: newObject
//                 }
//             }))
    

        this.props.reduxState.CartReducer.map((item)=>{
            const newObject ={
                customer: this.props.reduxState.user.id,
                card_id: item.id,
                sales_date: null,
                total: null,
                paid: false ,
                active: true,
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
    }
       


    render(){
        return(
            <div>
                <table>
                    <tr>
                        <th>
                            Name:
                        </th>
                        <th>
                            Set:
                        </th>
                        <th>
                            Price:
                        </th>
                        <th>
                            Remove
                        </th>
                    </tr>


                    {/* {JSON.stringify(this.props.reduxState.CartReducer)} */}
                    {this.props.reduxState.CartReducer.map((card)=>{
                    return(<tr>
                            <td>
                                {card.card_name}
                            </td>
                            <td>
                                {card.set}
                            </td>
                            <td>
                                {/* {card.price} */}
                            </td>
                            <td>
                                {/* needs to be corrected */}
                                <button onClick = {()=>{this.removeFromCart(card.id)}}>Remove</button>
                            </td>
                        </tr>)
                    })}
                    
                    
                </table>
                <button onClick = {this.checkoutOrder}>Check out</button>
            </div>
        )
    }
}
const mapStateToProps = reduxState => ({
    reduxState,
    user: reduxState.user,
    EditCard: reduxState.EditCard
  });
  
  export default connect(mapStateToProps)(Checkout)