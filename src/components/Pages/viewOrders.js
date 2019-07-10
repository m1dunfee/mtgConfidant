import React, {Component} from 'react'; 
import Axios from 'axios';


class ViewOrders extends Component{

    state = {
        active_orders: []
    }
    componentDidMount(){
       this.getOrderList()
    }
    
    getOrderList = ()=>{
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

    deactivate=(id)=>{
        //should add a alert for deactivation
        console.log('deactivate needs to be built out')
        Axios({
            method: 'put',
            url: '/localDB/deactivate',
            data: {
                payload:id
            }
        }).then((response)=>{
            console.log(response)
        })
        this.getOrderList()
    }

    paid=(id)=>{
        //should add a alert for deactivation
        console.log('Paid needs to be built out', id)
        // Axios({
        //     method: 'put',
        //     url: '/localDB/deactivate',
        //     data: {
        //         payload:id
        //     }
        // }).then((response)=>{
        //     console.log(response)
        // })
        // this.getOrderList()
    }


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
                            <td><button onClick = {()=>{this.paid(order.order_ID)}}>Paid</button></td>
                            <td><button onClick = {()=>{this.deactivate(order.order_ID)}}>deactivate</button></td>
                        </tr>)
                    })}
                </tbody>
            </table>
        )
    }
}

export default ViewOrders