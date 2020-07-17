import React, { useState, useEffect } from 'react';
import './App.css';
import Footer from './Footer/Footer';
import FooterPlaceholder from "./FooterPlaceholder";
import CategoryNavbar from './CategoryNavbar/CategoryNavbar';
import Login from './Login/Login';
import Register from './Register/Register';
import CategoryPage from "./CategoryPage/CategoryPage";
import AddProductFormic from './AddProductFormic/AddProductFormic';
import AddSubcategory from "./AddSubcategory/AddSubcategory";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import SubcategoryProducts from "./SubcategoryProducts/SubcategoryProducts";
import { AuthContext } from "./contexts/Auth";
import PrivateRoute from "./PrivateRoute/PrivateRoute"
import ShoppingCard from "./ShoppingCard/ShoppingCard"
import Contact from "./Contact";
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
    <AuthContext.Provider value={{ userInfo, setUserInfo,categories, setCategories }}>
      <BrowserRouter>
        <CategoryNavbar />
        <Switch>

          <Route path="/login" component={Login} />

          <Route path="/register" component={Register} />

          <Route path="/add-product" component={AddProductFormic} />

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

        </Switch>
        <FooterPlaceholder />
        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
