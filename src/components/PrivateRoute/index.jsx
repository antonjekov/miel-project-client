import React, { useState, useEffect, Fragment } from "react";
import { Route } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import Login from "../LoginPage" ;
import {Col,  Alert} from "react-bootstrap";

const PrivateRoute = ({ component: Component,autorized, ...rest }) => {

  const { userInfo } = useAuth();
  const [isAdmin, SetIsAdmin] = useState(false);
  const [show, setShow] = useState(true);
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
          <Alert variant="warning" show={show} onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Not autorized! </Alert.Heading>
            <p>You are not autorized to view this page! If you want to visit page, please login with <b>{autorized}</b> rights.</p>
          </Alert>
          </Col>
          <Login />          
        </Fragment>)
    )} />
  );
};

export default PrivateRoute;