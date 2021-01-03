import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ReusableForm from "./components/ReusableForm/ReusableForm";
import Login from "./components/Login/Login";
import UsersTable from "./components/UsersTable/UsersTable";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./protectedRoutes/route";
import { AuthContext } from "./context/auth";
import { RouteContext } from "./context/route";

function App() {
  const existingTokens = !!localStorage.getItem("tokens")
    ? JSON.parse(localStorage.getItem("tokens"))
    : "";
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const [page, setPage] = useState({
    title: "Submit From Details",
    isAdminPage: !!existingTokens,
    isLoggedin: existingTokens,
  });

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <div className="App">
        <BrowserRouter>
          <RouteContext.Provider value={{ page, setPage }}>
            <Navbar />
            <Switch>
              <Route exact path="/" component={ReusableForm} />
              <Route exact path="/login" component={Login} />
              <ProtectedRoute exact path="/users" component={UsersTable} />
            </Switch>
          </RouteContext.Provider>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
