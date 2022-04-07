import React, {Component} from "react";
import background from '../../assets/Home6.jpg'

export default class Aboutus extends Component{
    constructor(props) {
        super(props);

        this.state = {
            content:""
        };
    }

    render() {
        return (
            <div style={{backgroundImage:`url(${background})`, height:'91vh'}}>
            <div className="container">

            <br></br>
                <h2 className='display-' style={{fontFamily:'cursive',color:'darkgreen'}}>About Farmer's Web Portal</h2>
              
                <p style={{fontSize:'140%', fontStyle:'italic', color:"green"}}>
                <span>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}</span>Farmers are the backbone of the Society. Almost all the food items taken by us are produced by the Farmers. A farm is a area of land that is devoted primarily to agricultural processes with the primary
                    objective of producing food and other crops. This web portal helps to give more specific information about farm products and also help registered users to buy products. 
                </p>
              
                <h3 className='display-' style={{fontFamily:'cursive',color:'darkgreen'}}><u>Contact Us:</u></h3>
              
                <div class="row">
                <div class="col-md-6 mt-md-0 mt-3">
                <h3 style={{fontFamily:'cursive',color:'darkgreen'}}>Suraj Dasarwad</h3>
                <p style={{fontSize:'120%'}}>Email: surajdasarwad1@gmail.com
                <br />Mobile: +91 7385717668</p>
		
                    </div>
                    <div class="col-md-6 mt-md-0 mt-3" >

                            <h3 style={{fontFamily:'cursive',color:'darkgreen'}}>Shubham Sonar</h3>
                            <p style={{fontSize:'120%'}}>Email: sonarshubham04@gmail.com
                            <br />Mobile: +91 7058100111</p>

                    </div>
           </div>
          </div>
      </div>
        )
    }
}