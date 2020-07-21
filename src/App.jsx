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
import NotFoundPage from "./PageNotFound";
import './App.css';
import { AuthContext } from "./contexts/Auth";
import userService from "./services/user_service"
import categoryService from "./services/category_service"

function App() {

  const [userInfo, setUserInfo] = useState()
  const [categories, setCategories] = useState([]);

  useEffect(() => {

    //WITH THIS WE CAN MAKE OPTIMIZATION FOR NOT TO FECH DATA FROM SERVER ALL THE TIME
    // if (localStorage.getItem('categories')) {
    //   setCategories(JSON.parse(localStorage.getItem('categories')))
    //   return
    // }
    async function fetchData() {
      try {
        let result = await categoryService.getAll().then(res => res.json())
        setCategories(result)
        //localStorage.setItem('categories', JSON.stringify(result))
      } catch (error) {
        console.log('Failed to fatch data from server')//Server error page
      }
    }

    fetchData()
  }, []);

  useEffect(() => {
    //WITH THIS WE CAN MAKE OPTIMIZATION FOR NOT TO FECH DATA FROM SERVER ALL THE TIME
    // if (localStorage.getItem('user')) {
    //   setUserInfo(JSON.parse(localStorage.getItem('user')))
    //   return
    // }
    async function fetchData() {
      try {
        const res = await userService.getInfoForUser();
        if (res.status === 204 || !res.ok) {
          return
        }
        const resInfo = await res.json();
        setUserInfo(resInfo);
        //localStorage.setItem('user', JSON.stringify(resInfo))

      } catch (error) {
        console.log('Failed to fatch data from server')//Server error page
      }
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

          <PrivateRoute path="/add-product" autorized="admin" component={AddProduct} />

          <PrivateRoute path="/add-subcategory" autorized="admin" component={AddSubcategory} />

          <PrivateRoute path="/shoppingCard" autorized="client" component={ShoppingCard} />

          <Route path="/category/:id" component={CategoryPage} />

          <Route path="/contacts" component={Contact} />

          <Route path="/products/:category/:subcategory" component={SubcategoryProducts} />

          <Route path="/" exact component={Home} />

          <Route component={NotFoundPage}/>

        </Switch>
      </AuthContext.Provider>
      <FooterPlaceholder />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
