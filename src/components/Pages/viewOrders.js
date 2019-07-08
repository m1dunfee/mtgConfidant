import React, {Component} from 'react'; 
import Axios from 'axios';


class ViewOrders extends Component{

    state = {
        active_orders: []
    }
    componentDidMount(){
        Axios({
            method: 'get',
            url: '/localDB/active_orders',
            params:{string: this.state.value}
          }).then((response)=>{
            this.setState({
              active_orders: response.data
            })
          })
    }
    
    deactivate=()=>{
        console.log('deactivate needs to be built out')
        //this function needs to get order number and toggle all with order num to false
        Axios({
            method: 'put',
            url: '/localDB/deactivate',
            data: {
                payload:60
            }

        })
    }

    // orders should be colapsed into quantity of card_id


    render(){
        return(
            <table>
                <tbody>
                <tr className = 'thead'>
                        <th>
                            order #:    
                        </th>
                        <th>
                            Card Name:
                        </th>
                        <th>
                            Customer:
                        </th>
                        <th>
                            Total:
                        </th>
                        <th>
                            Date:
                        </th>
                    </tr>
                    
                    {this.state.active_orders.map((order)=>{
                       return ( 
                            <tr key = {order.id}>  
                            <td key = {order.order_ID}>   {order.order_ID}</td>  
                            <td key = {order.card_id}>   {order.card_name}</td> 
                            <td key = {order.customer}>   {order.username}</td> 
                            <td key = {order.total}>   {order.total}</td>     
                            <td key = {order.sales_date}>   {order.sales_date}</td>   
                            <td><button>Paid</button></td>
                            <td><button onClick = {this.deactivate}>deactivate</button></td>
                        </tr>)
                    })}
                </tbody>
            </table>
        )
    }
}

export default ViewOrders