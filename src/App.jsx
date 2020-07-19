import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Footer from './Footer';
import FooterPlaceholder from "./FooterPlaceholder";
import CategoryNavbar from './CategoryNavbar';
import Login from './Login';
import Register from './Register';
import CategoryPage from "./CategoryPage";
import AddProduct from './AddProduct';
import AddSubcategory from "./AddSubcategory";
import Home from "./Home";
import SubcategoryProducts from "./SubcategoryProducts";
import PrivateRoute from "./PrivateRoute"
import ShoppingCard from "./ShoppingCard"
import Contact from "./Contact";

import './App.css';
import { AuthContext } from "./contexts/Auth";
import userService from "./services/user_service"
import categoryService from "./services/category_service"

function App() {

  const [userInfo, setUserInfo] = useState()
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let result = await categoryService.getAll().then(res => res.json())
      setCategories(result)
    }

    fetchData()
  }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await userService.getInfoForUser();
      if (res.status === 204 || !res.ok) {
        return
      }
      const resInfo = await res.json();
      setUserInfo(resInfo);
    }
    fetchData()
  }, [])

  return (

    <BrowserRouter>
      <AuthContext.Provider value={{ userInfo, setUserInfo, categories, setCategories }}>
        <CategoryNavbar />
        <Switch>

          <Route path="/login" component={Login} />

          <Route path="/register" component={Register} />

          <Route path="/add-product" component={AddProduct} />

          <Route path="/add-subcategory" component={AddSubcategory} />

          {/* <PrivateRoute path="/add-subcategory" component={AddSubcategory} /> */}

          <Route path="/shoppingCard" component={ShoppingCard} />

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

          <Route path="/contacts" component={Contact} />

          <Route path="/products/:category/:subcategory" component={SubcategoryProducts} />

          <Route path="/" component={Home} />

          {/* <Route component={NotFoundPage}/> */}

        </Switch>
      </AuthContext.Provider>
      <FooterPlaceholder />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
