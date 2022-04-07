import React, { Component } from "react";

import background from '../../assets/Home6.jpg'

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

 

  render() {
    return (
      <div style={{backgroundImage:`url(${background})`, height:'91vh'}}>
        {/* <header className="jumbotron" style={{background:"transparent"}}> */}
          <div className="container">
			<h1 className='display-4' style={{fontFamily:'cursive',color:'darkgreen'}}>Welcome to the Farmer's Web Portal</h1>
			<p style={{fontSize:'140%', fontStyle:'italic', color:"green"}}>"LIFE ON A FARM IS A SCHOOL OF PATIENCE. YOU CANT HURRY THE CROPS OR MAKE AN OX IN TWO DAYS"</p>
			
      <p style={{fontSize:'140%'}}>To view and search the information about Crops <a href="/list-crops">click Here.</a> <br />
		
      To view and search the information about Equipments <a href="/list-equipments">click Here.</a><br />
          
      To view and search the information about Insecticide <a href="/insecticide">click Here.</a><br />
		
     To view and search the information about Pesticide <a href="/pesticide">click Here.</a></p>
		
      <p style={{fontSize:'180%', fontStyle:'italic', color:"darkgreen"}}>To purchase Pesticides and Insecticides please Login.</p>
		


</div>
{/* </header> */}
      </div>
    );
  }
}
