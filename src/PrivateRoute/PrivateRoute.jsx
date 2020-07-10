import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

function PrivateRoute({ component: Component, ...rest }) {
  const {userInfo} = useAuth();
console.log(userInfo)
  return (
    <Route
      {...rest}
      render={props =>
        userInfo&&userInfo.role==='admin'? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default PrivateRoute;