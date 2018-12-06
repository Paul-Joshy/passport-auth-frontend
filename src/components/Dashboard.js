import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

import * as actions from '../actions';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
    this.unlinkFacebook = this.unlinkFacebook.bind(this);
    this.unlinkGoogle = this.unlinkGoogle.bind(this);
  }

  async unlinkGoogle() {
    const res = await axios.get('http://localhost:5000/user/google/unlink');
    if(res)
      this.props.getUserDetails()    
  }

  async unlinkFacebook() {
    const res = await axios.get('http://localhost:5000/user/facebook/unlink');
    if(res)
      this.props.getUserDetails()    
  }

  async componentDidMount() {
    this.props.getUserDetails()
  }

  async responseGoogle(res) {
    await this.props.oauthGoogle(res.accessToken);
    if (!this.props.errorMessage) {
      // this.props.history.push('/dashboard');
      this.props.getUserDetails()
    }
  }

  async responseFacebook(res) {
    await this.props.oauthFacebook(res.accessToken);
    if (!this.props.errorMessage) {
      // this.props.history.push('/dashboard');
      this.props.getUserDetails()
    }
  }

  getFacebookButton() {
    if(this.props.userDetails.facebook.email)
      return(
      
        <button className="btn btn-outline-primary" onClick={this.unlinkFacebook}> Unlink facebook account </button>
        //  <a href="">unlink Faceboook account {this.unlinkFacebook()} </a> 
      )
    else
      return(
      <FacebookLogin
        appId="2289289101305289"
        textButton="Link Facebook account"
        fields="name,email,picture"
        callback={this.responseFacebook}
        cssClass="btn btn-outline-primary"
      />
      )
  }

  getGoogleButton() {
    if(this.props.userDetails.google.email)
      return(
        <button className="btn btn-outline-danger" onClick={this.unlinkGoogle}> Unlink google account </button>
      )
    else
      return( <GoogleLogin 
        clientId="412672525245-ls168g9ol8363n2oqae5ubamra1pju3g.apps.googleusercontent.com"
        buttonText="Link Google account"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
        className="btn btn-outline-danger"
      /> )
  }

  render() {
    console.log('userDetails =', this.props.userDetails)
    // if(userDetails && userDetails.data)
    return (
      <div>
        This is a Dashboard component
        <br/>
        <h3>Your email is {this.props.userDetails.local.email}</h3>
        <h3>Your Id is {this.props.userDetails.id}</h3>
        {this.getFacebookButton()} <br/>
        {this.getGoogleButton()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userDetails: state.dash.userDetails
  }
}

export default connect(mapStateToProps, actions)(Dashboard);
