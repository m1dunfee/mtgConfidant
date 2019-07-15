import React, {Component} from 'react'; 
import {connect} from 'react-redux'


class SideBar extends Component{

    handleClick=()=>{
        console.log('hello worrld')
    }

    render(){
        return(
            <div className = 'cartSidebar'>
                <h2 className ='cart'>
                    Cart:
                </h2>
                <table className = 'cart'>
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
                                Quantity
                            </th>
                        </tr>
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
                                    {card.quantity}
                                </td>
                            </tr>)
                        })}
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
  
  export default connect(mapStateToProps) (SideBar);