import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { authTokens } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (authTokens) {
          console.log('tokens are' ,authTokens)
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
