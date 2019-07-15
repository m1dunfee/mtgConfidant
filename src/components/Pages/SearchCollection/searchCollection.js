import React, {Component} from 'react'; 
import {connect} from 'react-redux';
import axios from 'axios';
import CardDetails from './CardDetails'


class SearchCollection extends Component{
    state = {
        card: '',
        newCardName: '',
        newCardSet: '',
        NewCardIn_stock: ''
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

    onChange=(event, id)=>{
        this.handleChange1(id)
        this.handleChange2(event)
    }

    handleChange1(id){
        console.log('handleChange1')
        console.log(id)
        this.setState({
            card: id
        })
    }

    handleChange2(event){
        console.log('handleChange2')
        console.log('onchange',event.target.value)
        this.props.dispatch({
            type: 'Edit_Card',
            payload: event.target.value
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

    createCard =()=>{
        console.log('create button clicked')
        axios({
            method: 'put',
            url: 'localDB/card_add/',
            data:{
                payload1: this.state.newCardName,
                payload2: this.state.newCardSet
            }
        })
    }


    addToCart=(card)=>{
        console.log('add to cart',card)
        this.props.dispatch({
            type: 'CART',
            payload: [card]
        })
    }

    createCardChangeName=(event)=>{
        this.setState({
            newCardName: event.target.value
        })
    }

    createCardChangeSet=(event)=>{
        this.setState({
            newCardSet: event.target.value
        })
    }

    render(){
        return(
            <div>
                {/* {JSON.stringify(this.props.user)} */}
                {/* {JSON.stringify(this.state)} */}
                {this.props.user.admin ? 
                <div>
                <input placeholder = "name" onChange={this.createCardChangeName}/>
                <input placeholder = "set" onChange={this.createCardChangeSet}/>
                <button onClick={this.createCard}>Add Card</button>
                </div>
                : 
                []
                }
            

            <table className = 'card'>
                <thead>
                <tr className = 'thead'>
                        <th>
                            {/* IMG:     */}
                        </th>
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
                            Instock:
                        </th>
                        {/* <th>
                            Quantity:
                        </th> */}
                        <th>
                            Add to Cart:
                        </th>
                    </tr>                    
               </thead>
               <tbody>
            
            {this.props.reduxState.SearchBarReducer.SearchBarSuggestions.map((card)=>{
                       return ( 
            <CardDetails card = {card}/>
            )})}
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