import React, { Component } from 'react';
import './App.css';
import './autosuggest/suggestion.css'
import Autosuggest from 'react-autosuggest';
import Axios from 'axios'; 
import {connect} from 'react-redux'
 
class SearchBar extends React.Component {
  state = {
     value: '',
     suggestions: []
   };
  

 getData = ()=>{
  Axios({
    method: 'get',
    url: '/localDB/autoFill',
    params:{string: this.state.value}
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
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  console.log('length log',inputLength)
 
  return inputLength === 0 ? [] : this.state.suggestions.filter(lang =>
    lang.card_name.toLowerCase().slice(0, inputLength) === inputValue
  );
};
 
onClick= ()=>{
  this.props.dispatch({
    type: 'SET_SUGGESTIONS',
    payload: [this.state.suggestions]
  })  
  console.log(this.props.reduxState.Suggestions)
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
        this.getData()
    }}
 
    // Finally, render it!
    return (
      <div className = 'App'> 
        
          {JSON.stringify(this.state)}

          <button onClick = {this.onClick}>Search</button>
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
const mapStateToProps = reduxState => ({
reduxState: reduxState
});

export default connect(mapStateToProps)(SearchBar);