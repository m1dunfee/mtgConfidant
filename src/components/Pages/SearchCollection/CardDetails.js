import React, {Component} from 'react'; 
import {connect} from 'react-redux';


class SearchCollection extends Component{


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
}


onChangeIn_stock=(event, id)=>{
    // this.props.dispatch({type:'SearchBar', payload:this.props.reduxState.SearchBarReducer.SearchBarValue})
    this.setState({
        NewCardIn_stock: event.target.value,
        card: id
    })
}


ddToCart=(card)=>{
    console.log('add to cart',card)
    this.props.dispatch({
        type: 'CART',
        payload: [card]
    })
}


    render(){
        return(
            <div>
                <table className = 'card'>
                    <tbody>

                    {/* not sure how  SearchBarReducer.SearchBarSuggestions is working when it should be working with SuggestionsReducer*/}
                    {this.props.reduxState.SearchBarReducer.SearchBarSuggestions.map((card)=>{
                       return ( 
                         <tr key = {card.id}>  
                            <td key = {card.img_path}>  
                              {/* {JSON.stringify(this.props.EditCard)} */}
        {/* card name */}
                               </td> 
                            <td key = {card.card_name}>    
                            {card.card_name}</td>  

        {/* card set */}
                             <td key = {card.set}>    
                                {   card.set}
                            </td>   
        {/*card price  */}
                            <td>

                            </td>
        {/* card quantity */}
                            <td key = {card.in_stock}>
                            {this.props.user.admin ?
                                    <div> 
                                        <input onChange={(e)=>{this.onChangeIn_stock(e,card.id)}} placeholder = "Update in-stock"/>
                                        <button  onClick= {()=>{this.onClick('in_stock')}}>{card.in_stock}</button>
                                    </div>
                                    :
                                    card.in_stock}
                            </td>

        {/* add to cart */}
                            <td>
                                <button onClick = {()=>{this.addToCart(card)}}>add to cart!</button>
                                {/* {JSON.stringify(this.props.reduxState.CartReducer)} */}
                            </td>


                             
                        </tr>)
                    })}
                </tbody>
            </table>
            </div>
        )
    }
}
const mapStateToProps = reduxState => ({
    reduxState,
    user: reduxState.user,
    EditCard: reduxState.EditCard
  });
  
  export default connect(mapStateToProps)( SearchCollection)