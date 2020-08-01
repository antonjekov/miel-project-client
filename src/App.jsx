import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Spinner } from 'react-bootstrap';

import Footer from './components/Footer';
import FooterPlaceholder from "./components/FooterPlaceholder";
import CategoryNavbar from './components/CategoryNavbar' ;
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import CategoryPage from "./components/CategoryPage";
import AddProductPage from './components/AddProductPage';
import EditProductPage from "./components/EditProductPage";
import AddSubcategoryPage from "./components/AddSubcategoryPage";
import HomePage from "./components/HomePage" ;
import SubcategoryProductsPage from "./components/SubcategoryProductsPage";
import PrivateRoute from "./components/PrivateRoute"
import ShoppingCardPage from "./components/ShoppingCardPage"
import ContactPage from "./components/ContactPage";
import NotFoundPage from "./components/NotFoundPage";
import './App.css';

import { AuthContext } from "./contexts/Auth";
import userService from "./services/user_service"
import categoryService from "./services/category_service"

function App() {

    const [userInfo, setUserInfo] = useState()
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true)
    const [loadingUser, setLoadingUser] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                let result = await categoryService.getAll().then(res => res.json())
                setCategories(result)
                setLoadingCategories(false)              
            } catch (error) {
                setLoadingCategories(false) 
                console.log('Failed to fatch data from server')//Server error page
            }
        }
        fetchData()
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await userService.getInfoForUser();
                if (res.status === 204 || !res.ok) {
                    setLoadingUser(false)
                    return
                }
                const resInfo = await res.json();
                setUserInfo(resInfo);
                setLoadingUser(false)
            } catch (error) {
                setLoadingUser(false)
                console.log('Failed to fatch data from server')//Server error page
            }
        }
        fetchData()
    }, [])

    if (loadingCategories||loadingUser) {
        return <Spinner animation="border" variant="warning" />
    }

    return  (        
        <BrowserRouter>
            <AuthContext.Provider value={{ userInfo, setUserInfo, categories, setCategories }}>
                
                <CategoryNavbar />
                <Switch>

                    <Route path="/login" component={LoginPage} />

                    <Route path="/register" component={RegisterPage} />

                    <PrivateRoute path="/add-product" autorized="admin" component={AddProductPage} />

                    <PrivateRoute path="/edit-product/:id" autorized="admin" component={EditProductPage} />

                    <PrivateRoute path="/add-subcategory" autorized="admin" component={AddSubcategoryPage} />

                    <PrivateRoute path="/shoppingCard" autorized="client" component={ShoppingCardPage} />

                    <Route path="/category/:id" component={CategoryPage} />

                    <Route path="/contacts" component={ContactPage} />

                    <Route path="/products/:category/:subcategory" component={SubcategoryProductsPage} />

                    <Route path="/" exact component={HomePage} />

                    <Route component={NotFoundPage} />

                </Switch>
            </AuthContext.Provider>
            <FooterPlaceholder />
            <Footer />
        </BrowserRouter>
    );
}

export default App;
