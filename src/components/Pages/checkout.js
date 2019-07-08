import React, {Component} from 'react'; 
import {connect} from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Checkout extends Component{

    state={
        order_ID:0
    }

    removeFromCart=(id)=>{
        for(let i=0; i< this.props.reduxState.CartReducer.length; ++i){
            if(this.props.reduxState.CartReducer[i].id===id){
                return this.props.reduxState.CartReducer.splice(i,1)
            }
        }
    }

    checkoutOrder=()=>{
        this.props.dispatch({
            type: 'ORDER_ID',
            payload: {
                cart: this.props.reduxState.CartReducer,
                user: this.props.reduxState.user.id
            }
        })
        alert('Your order has been received!')
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
                <div>
                    {this.props.reduxState.user.id?
                    <button onClick = {this.checkoutOrder}>Check out</button>
                    :
                    <Link to = '/home'><button>login to continue</button></Link>
                    }
                </div>
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