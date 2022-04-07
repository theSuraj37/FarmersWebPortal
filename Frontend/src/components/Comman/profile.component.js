import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import { Redirect } from "react-router-dom";
import background from "../../assets/userhome1.jpg"

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();


    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div style={{backgroundImage:`url(${background})`, height:'91vh'}}>
        
        <header className="jumbotron" style={{background:"transparent"}}>
          <div className="container">
          <h1 className='display-5' style={{fontFamily:'cursive',color:'darkgreen'}}>
            Welcome {currentUser.username} to the Farmer's Web Portal.
          </h1>
          <br />

        <p style={{fontSize:'140%'}}>To know information about Crops <a href="/list-crops">click Here.</a></p>
		
        <p style={{fontSize:'140%'}}>To know information about Equipments <a href="/list-equipments">click Here.</a></p>
  
        <p style={{fontSize:'140%'}}>To know information about Insecticides <a href="/user-insecticide">click Here.</a></p>
  
        <p style={{fontSize:'140%'}}>To know information about Pesticides <a href="/user-pesticide">click Here.</a></p>
  
        </div>
        </header>
      </div>
    );
  }
}
