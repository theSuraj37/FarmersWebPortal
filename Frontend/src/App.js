import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Comman/login.component";
import Register from "./components/Comman/register.component";
import Home from "./components/Comman/home.component"
import Profile from "./components/Comman/profile.component";
import ListCrops from "./components/Crop/ListCropComponent"
import AddCrops from "./components/Crop/AddCropsComponenet"
import Crops from "./components/Crop/ListCrops"

import ListEquipments from "./components/Equipment/ListEquipmentComponent"
import AddEquipments from "./components/Equipment/AddEquipmentComponent"
import Equipments from "./components/Equipment/ListEquipments"

import AddProducts from "./components/Product/AddProducts"
import Products from "./components/Product/ListProducts"

import Insecticide from "./components/Product/ListInsecticide"
import Pesticide from "./components/Product/ListPesticide"

import UserInsecticide from "./components/UserComponent/ListInsecticide"
import UserPesticide from "./components/UserComponent/ListPesticide"
import Cart from "./components/UserComponent/Cart"
import Order from "./components/UserComponent/Order"

import Aboutus from "./components/Comman/aboutus.component";

import ProtectedRoute from "./components/ProtectedRoute";
import OrderHistory from "./components/UserComponent/OrderHistory";

import AllUsers from "./components/UserComponent/AllUsers"

import AllOrder from './components/UserComponent/AllOrder'
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: false,
      wuser:undefined,
      auth : false
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if(user) {
      this.setState({
        wuser : user
      });

      if(user.roles[0]==="ROLE_USER")
      {
        this.setState({
            currentUser: true,
            showAdminBoard: false,
            auth:true
          });
      }

      if(user.roles[0]==="ROLE_ADMIN")
      {
        this.setState({
          currentUser: false,
          showAdminBoard: true,
          auth:true
        });
      }
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showAdminBoard: false,
      currentUser: false,
    });
  }

  loginHandler=()=>{
 
    this.state.auth({auth:!this.state.auth});

  }

  render() {
   const { currentUser , showAdminBoard, wuser} = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark " style={{backgroundColor:"green"}}>
          <Link to={"/"} className="navbar-brand">
            Farmer's Web Portal
          </Link>
          <div className="navbar-nav mr-auto">
         
        {!(showAdminBoard || currentUser ) && (
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
              </li>
            )}

            {(showAdminBoard || currentUser ) && (
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  Home
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link to={"/about"} className="nav-link">
                About Us
              </Link>
            </li>

            
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/crops"} className="nav-link">
                  Crops
                </Link>
              </li>
            )}


            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/equipments"} className="nav-link">
                  Equipment
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/products"} className="nav-link">
                  Products
                </Link>
              </li>
            )}

            
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/allorder"} className="nav-link">
                  All Orders
                </Link>
              </li>
            )}


          {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/allusers"} className="nav-link">
                  All Users
                </Link>
              </li>
            )}


            {currentUser && (
              <div className="navbar-nav ml-auto">
             <li className="nav-item">
             <Link to={"/cart"} className="nav-link">
               Cart
             </Link>
           </li>
           <li className="nav-item">
             <Link to={"/order-history"} className="nav-link">
               Order History
             </Link>
           </li>
           </div>
            )}


          </div>



          {(showAdminBoard || currentUser ) ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {wuser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/home" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}

           
        </nav>

        <div login={this.loginHandler} status={this.state.auth}>
          <Switch >
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/list-crops" component={ListCrops} />
            <ProtectedRoute path="/add-crops" component={AddCrops} auth={this.state.auth} />
            <ProtectedRoute path="/crops" component={Crops} auth={this.state.auth} />
            <ProtectedRoute path = "/edit-crops/:id" component= {AddCrops } auth={this.state.auth}/>
            <ProtectedRoute path = "/equipments" component={Equipments} auth={this.state.auth}/>
            <ProtectedRoute path = "/add-equipment" component={AddEquipments} auth={this.state.auth}/>
            <Route path = "/list-equipments" component={ListEquipments} />
            <ProtectedRoute path = "/edit-equipments/:id" component={AddEquipments} auth={this.state.auth}/>
            <ProtectedRoute path = "/add-product" component={AddProducts} auth={this.state.auth}/>
            <ProtectedRoute path = "/products" component={Products} auth={this.state.auth}/>
            <ProtectedRoute path = "/edit-products/:prodId" component={AddProducts} auth={this.state.auth}/>

            <Route path = "/insecticide" component={Insecticide} />
            <Route path = "/pesticide" component={Pesticide} />

            <Route path = "/user-insecticide" component={UserInsecticide} />
            <Route path = "/user-pesticide" component={UserPesticide} />
            <ProtectedRoute path = "/cart" component={Cart} auth={this.state.auth}/>
            <ProtectedRoute path = "/order/:totalCost" component={Order} auth={this.state.auth}/>
            
            <Route path = "/about" component={Aboutus} />
            <Route path= "/order-history" component={OrderHistory} auth={this.state.auth}/>

            <Route path= "/allorder" component={AllOrder} auth={this.state.auth} />
            <Route path= "/allusers" component={AllUsers} auth={this.state.auth} />

          </Switch>
        </div>
      </div>
       
    );
  }
}

export default App;