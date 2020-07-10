import React, { useState, useContext } from 'react';
import './App.css';
import { Row, Col, Container } from 'react-bootstrap';
import Footer from './Footer/Footer';
import NavigationControls from "./NavigacionControls/NavigationControls";
import CategoryNavbar from './CategoryNavbar/CategoryNavbar';
import Login from './Login/Login';
import Register from './Register/Register';
import CategoryPage from "./CategoryPage/CategoryPage";
import AddProductFormic from './AddProductFormic/AddProductFormic';
import AddSubcategory from "./AddSubcategory/AddSubcategory";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import SubcategoryProducts from "./SubcategoryProducts/SubcategoryProducts";
import UserContext from "./contexts/UserContext";
import { AuthContext } from "./contexts/Auth";
import PrivateRoute from "./PrivateRoute/PrivateRoute"
import ShoppingCard from "./ShoppingCard/ShoppingCard"

function App() {

  // const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  // const [authTokens, setAuthTokens] = useState(existingTokens);
  
  // const setTokens = (data) => {
  //   localStorage.setItem("tokens", JSON.stringify(data));
  //   setAuthTokens(data);
  // }
  const existingUserInfo =JSON.parse(localStorage.getItem("userInfo")) ;
  const [userInfo, setUserInfo] = useState(existingUserInfo)

  const setUser = (data)=>{
    localStorage.setItem("userInfo",JSON.stringify(data))
    setUserInfo(data)
  }

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo: setUser }}>
      <BrowserRouter>
        <NavigationControls />
        <CategoryNavbar />
        <Switch>

          <Route path="/login" >
            <Login setUser = {setUser}/>
          </Route>

          <Route path="/register" component={Register} />

          <PrivateRoute path="/add-product" component={AddProductFormic} />

          <PrivateRoute path="/add-subcategory" component={AddSubcategory}/>
          
          <Route path="/shoppingCard/add" component={ShoppingCard}/>

          <Route path="/honey">
            <CategoryPage category='honey' />
          </Route>

          <Route path="/cosmetics">
            <CategoryPage category='cosmetics' />
          </Route>

          <Route path="/other bee products">
            <CategoryPage category='other bee products' />
          </Route>

          <Route path="/apitherapy">
            <CategoryPage category='apitherapy' />
          </Route>

          <Route path="/products/:category/:subcategory" component={SubcategoryProducts} />

          <Route path="/" component={Home} />

        </Switch>

        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
