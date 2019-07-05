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
    
    render(){
        return(
            <table>
                <tbody>
                <tr className = 'thead'>
                        <th>
                            order #:    
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
                            <td key = {order.id}>   {order.id}</td>   
                            <td key = {order.id}>   {order.customer}</td> 
                            <td key = {order.id}>   {order.total}</td>     
                            <td key = {order.id}>   {order.sales_date}</td>   
                        </tr>)
                    })}
                </tbody>
            </table>
        )
    }
}

export default ViewOrders