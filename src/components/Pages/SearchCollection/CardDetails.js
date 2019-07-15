import React, {Component} from 'react'; 
import {connect} from 'react-redux';
import axios from 'axios'

class CardDetails extends Component{
    state={
        quantity: 0
    }

    onChange=(event)=>{
        this.setState({
            quantity: event.target.value
        })
        console.log(event.target.value)
    }

onClick = () =>{
    console.log('new cark instock',this.state.NewCardIn_stock)
    console.log('card',this.state.card)
    axios({
        method: 'put',
        url: '/localDB/card_update_in_stock/',
        data: {
            payload1: this.state.NewCardIn_stock,
            payload2: this.state.card
            } 
    })
    this.props.dispatch({
        type: 'SearchBar',
        payload: this.props.reduxState.SearchBarReducer.SearchBarValue
    })
}


onChangeIn_stock=(event, id)=>{
    // this.props.dispatch({type:'SearchBar', payload:this.props.reduxState.SearchBarReducer.SearchBarValue})
    this.setState({
        NewCardIn_stock: event.target.value,
        card: id
    })
}


addToCart=(card)=>{
    // add a dispatch that will update card qauntity with local state
    // I might have to use a slice like the remove function to find the needed card...
    console.log('add to cart',card)
    const newCard = {
        id: card.id,
        card_name: card.card_name,
        set: card.set,
        price: card.price,
        order_id: card.order_id,
        Img_path: card.Img_path,
        in_stock: card.in_stock,
        quantity: this.state.quantity
    } 
    this.props.dispatch({
        type: 'CART',
        payload: [newCard]
    })
}

handleDelete= (id) =>{
    console.log('handle delete',id)
    axios({
        method:'delete',
        url: '/localDB/card_delete',
        data: {
            card_id: id
            }
    })
}


    render(){
        return(
    <>
                    {/* not sure how  SearchBarReducer.SearchBarSuggestions is working when it should be working with SuggestionsReducer*/}
                        {/* {JSON.stringify(this.props.card)} */}
                         <tr key = {this.props.card.id}>  
                            <td key = {this.props.card.img_path}>  
                              {/* {JSON.stringify(this.props.EditCard)} */}
        {/* card name */}
                               </td> 
                            <td key = {this.props.card.card_name}>    
                            {this.props.card.card_name}</td>  

        {/* card set */}
                             <td key = {this.props.card.set}>    
                                {   this.props.card.set}
                            </td>   
        {/*card price  */}
                            <td>

                            </td>
        {/* in-stock*/}
                            <td key = {this.props.card.in_stock}>
                            {this.props.user.admin ?
                                    <div> 
                                        <input onChange={(e)=>{this.onChangeIn_stock(e,this.props.card.id)}} placeholder = "Update in-stock"/>
                                        <button  onClick= {()=>{this.onClick('in_stock')}}>{this.props.card.in_stock}</button>
                                    </div>
                                    :
                                    this.props.card.in_stock}
        {/* Cart Quantity */}
                            </td>
                                <input onChange = {(e)=>{this.onChange(e)}} placeholder = 'Add to Cart'></input>
                            <td>

                            </td>

        {/* add to cart */}
                            <td>
                                <button onClick = {()=>{this.addToCart(this.props.card)}}>add to cart!</button>
                                {/* {JSON.stringify(this.props.reduxState.CartReducer)} */}
                            </td>
                            
                            <td>
                                {this.props.user.admin ?
                                    <div> 
                                        <input onChange={(e)=>{this.onChangeIn_stock(e,this.props.card.id)}} placeholder = "Update in-stock"/>
                                        {/* <button  onClick= {()=>{this.onClick('in_stock')}}>{this.props.card.in_stock}</button> */}
                                        <button  onClick= {()=>{this.handleDelete(this.props.card.id)}}>Delete</button>
                                    </div>
                                    :
                                    this.props.card.in_stock}
                            </td>

                             
                        </tr>
                        </>
        )
                }
}
const mapStateToProps = reduxState => ({
    reduxState,
    user: reduxState.user,
    EditCard: reduxState.EditCard
  });
  
  export default connect(mapStateToProps)( CardDetails)