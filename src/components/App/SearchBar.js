import React, { Component } from 'react';
import './App.css';
import './autosuggest/suggestion.css'
import Autosuggest from 'react-autosuggest';
import axios from 'axios'; 
import {connect} from 'react-redux'
import {
  HashRouter as Router,
  Link
} from 'react-router-dom';
 
class SearchBar extends React.Component {
  state = {
     value: '',
     suggestions: []
   };
  

 getData = (newValue)=>{


//this code will start pushing the searbar data onto redux
  //    this.props.dispatch({
//      type: 'SearchBar',
//      payload:newValue
//    })


axios({
    method: 'get',
    url: '/localDB/autoFill',
    params:{string: newValue}
  }).then((response)=>{
    this.setState({
      suggestions: response.data
    })
  })
 }
 
 
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };
 
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

 getSuggestions = (value) => {
  console.log(value)
  const inputValue = value.trim().toLowerCase();
  
  const inputLength = inputValue.length;
  // console.log('length log',inputLength)
 
  return inputLength === 0 ? [] : this.state.suggestions.filter(lang =>
    lang.card_name.toLowerCase().slice(0, inputLength) === inputValue
  );
};
 
onClick= ()=>{
  this.props.dispatch({
    type: 'SET_SUGGESTIONS',
    payload: this.state.suggestions
  })  
  this.props.dispatch({
    type: 'SET_VALUE',
    payload: this.state.value
  })  
  // console.log(this.props.state.Suggestions)
}

onSuggestionsClearRequested = () =>{this.Suggestions = []}

getSuggestionValue = suggestion => suggestion.card_name;
 
renderSuggestion = suggestion => (
  <div>
    {suggestion.card_name}
  </div>
);

  render() {
 
    const inputProps = {
      placeholder: 'Rummage collection',
      value: this.state.value,
      onChange: (event, { newValue }) => {
        this.setState({
          value: newValue
        });
        console.log(this.state.value)
        this.getData(newValue)
    }}
 
    // Finally, render it!
    return (
      <div className = 'App'> 
        
          {/* {JSON.stringify(this.props.state.SuggestionsReducer)} */}
          {/* {JSON.stringify(this.props.state.SearchBarReducer)} */}


          <Link to = '/searchcollection'><button onClick = {this.onClick}>Search</button></Link>
          <Autosuggest
            suggestions={this.state.suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
            />
           
      </div>
    );
  }
}
const mapStateToProps = state => ({
state: state
});

export default connect(mapStateToProps)(SearchBar);