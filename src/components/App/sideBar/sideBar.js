import React, {Component} from 'react'; 


class SideBar extends Component{

    handleClick=()=>{
        console.log('hello worrld')
    }

    render(){
        return(
            <div className = 'dropdown'>
                <button onClick={this.handleClick}>drop down cart</button>
            </div>
        )
    }
}

export default SideBar