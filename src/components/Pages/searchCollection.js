import React, {Component} from 'react'; 
import {connect} from 'react-redux';
import axios from 'axios';


class SearchCollection extends Component{
    state = {
        card: '',
        newCardName: '',
        newCardSet: ''
    }
    
    OnClickSwitch = (method) =>{
        switch (method) {
            case 'name':
                console.log(method)
                axios({
                    method: 'put',
                    url: '/localDB/card_update_name/',
                    data: {
                        payload1: this.props.EditCard,
                        payload2: this.state.card
                        } 
                })
                break;
        
            case 'set':
                console.log(method)
                axios({
                    method: 'put',
                    url: '/localDB/card_update_set/',
                    data: {
                        payload1: this.props.EditCard,
                        payload2: this.state.card
                        } 
                })
                break;
    
            case 'price':
                console.log(method)
                break;
        }
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

    createCardChangeSet=(event)=>{
        console.log(event.target.value)
        this.setState({
            newCardSet: event.target.value
        })
    }

    createCardChangeName=(event)=>{
        console.log(event.target.value)
        this.setState({
            newCardName: event.target.value
        })
    }


    render(){
        return(
            <div>
            <input placeholder = "name" onChange={this.createCardChangeName}/>
            <input placeholder = "set" onChange={this.createCardChangeSet}/>
            <button onClick={this.createCard}>Add Card</button>
            <table>
                <tbody>
                <tr className = 'thead'>
                        <th>
                            IMG:    
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
                            delete
                        </th>
                    </tr>
                    
                    {this.props.reduxState.SuggestionsReducer.map((card)=>{
                       return ( 
                         <tr key = {card.id}>  
                            <td key = {card.img_path}>  
                              {/* {JSON.stringify(this.props.EditCard)} */}
                               </td> 
                            <td key = {card.card_name}>    
                            {this.props.user.admin ?
                                <div> <input onChange={(e)=>{this.onChange(e,card.id)}} placeholder = "Update"/>
                                <button onClick= {()=>{this.OnClickSwitch('name')}}>{card.card_name}</button></div>
                                :
                                card.card_name}</td>  

                            {/* this is the most up to date tree */}
                             <td key = {card.set}>    
                                {this.props.user.admin ?
                                    <div> <input onChange={(e)=>{this.onChange(e,card.id)}} placeholder = "Update"/>
                                    <button  onClick= {()=>{this.OnClickSwitch('set')}}>{card.set}</button></div>
                                    :
                                    card.set}</td>   
                            <td>price</td>

                             <td><button onClick ={()=>{this.handleDelete(card.id)}}>Delete</button></td>
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