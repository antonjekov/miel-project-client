import React, { useState, useEffect, Fragment } from "react";
import { Route } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import Login from "../LoginPage" ;
import {Col} from "react-bootstrap";
import UnSuccessMessage from "../UnSuccessMessage/index";
const PrivateRoute = ({ component: Component,autorized, ...rest }) => {

  const { userInfo } = useAuth();
  const [isAdmin, SetIsAdmin] = useState(false);
  useEffect(() => {
    function fetch() {
      const result = userInfo && userInfo.role === autorized ? true : false;
      SetIsAdmin(result)
    }
    fetch()
  }, [userInfo,autorized]);
  
  return (
    <Route {...rest} render={props => (
      isAdmin ?
        <Component {...props} />
        : (<Fragment>
          <Col md={{ offset: 4, span: 4 }}>
          <UnSuccessMessage show={true} message={`You are not autorized to view this page! If you want to visit page, please login with <b>${autorized}</b> rights.`}/>          
          </Col>
          <Login />          
        </Fragment>)
    )} />
  );
};

export default PrivateRoute;