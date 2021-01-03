import React from "react";
import { withRouter } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { logout } from "../../api/api";
import { Avatar, Box, Grommet, Header, Nav, Button } from "grommet";
import { grommet } from "grommet/themes";
import { useRoute } from "../../context/route";
import wissen from "../../wissen.jpg";

const OnHeaderNav = (props) => {
  const { setAuthTokens, authTokens } = useAuth();
  const { page, setPage } = useRoute();

  const handleLogin = () => {
    setPage({ title: "Admin Login", isAdminPage: true, isLoggedin: false });
    props.history.push("/login");
  };

  const handleLogout = async () => {
    const response = await logout(authTokens);
    if (response.status === 200) {
      setPage({
        title: "Submit Form Details",
        isAdminPage: false,
        isLoggedin: false,
      });
      setAuthTokens("");
    }
  };


  return (
    <Grommet theme={grommet}>
      <Header background="dark-1" pad="small">
        <Box direction="row" align="center" gap="small">
          <Avatar src={wissen} />
          {page.title}
        </Box>
        <Nav direction="row">
          {!page.isAdminPage && (
            <Button
              primary
              label="Admin Login"
              onClick={handleLogin}
              {...props}
            />
          )}
          {page.isLoggedin && (
            <Button primary label="Logout" onClick={handleLogout} {...props} />
          )}
        </Nav>
      </Header>
    </Grommet>
  );
};

export default withRouter(OnHeaderNav);
