import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

import SearchBar from '../App/SearchBar'



const Nav = (props) => (
  <div className="nav">
    <Link to="/searchcollection">
      <h2 className="nav-title">Mtg Confidant</h2>
    </Link>
    <SearchBar/>
    <div className="nav-right">

      <Link className="nav-link" to = "/Checkout">Checkout</Link> 
      <Link className="nav-link" to="/home">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ? 'accountdetails' : 'Login / Register'}</Link>

      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.user.id && (<><Link className="nav-link" to="/info">Info Page</Link>   <LogOutButton className="nav-link"/></>)}
      
      {props.user.id && props.user.admin && (<Link className="nav-link" to = "/vieworders">View Orders</Link>)}
      {/* <span>{JSON.stringify(props.users)}</span> */}


      {/* Always show this link since the about page is not protected */}
      <Link className="nav-link" to="/about">
        About
      </Link>
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);