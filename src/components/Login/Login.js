import React, {  useState } from "react";
import { Hide, View } from "grommet-icons";
import { login } from "../../api/api";
import { useRoute } from "../../context/route";
import "./Login.css";

import {
  Box,
  Button,
  Form,
  FormField,
  Grommet,
  MaskedInput,
  TextInput,
} from "grommet";
import { grommet } from "grommet/themes";
import { useAuth } from "../../context/auth";

const defaultValue = {
  email: "",
  password: "",
  reveal: false,
};

const Login = (props) => {
  const [value, setValue] = useState(defaultValue);
  const { setPage } = useRoute();
  const [isError, setIsError] = useState(false);
  const { setAuthTokens } = useAuth();

  const handleCancel = (e) => {
    setPage({
      title: "Submit Form Details",
      isAdminPage: false,
      isLoggedin: false,
    });
    props.history.push("/", {
      title: "Submit Form Details",
      isAdminPage: false,
    });
  };
  const handleSubmit = async (e) => {
    try {
      const response = await login(e.value);
      if (response.data) {
        setAuthTokens(response.data.token);
        setPage({ title: "Users Table", isAdminPage: true, isLoggedin: true });
        props.history.push('/users')
      } else {
        setIsError(true);
        setValue(defaultValue);
        setTimeout(() => {
          setIsError(false);
        }, 2000);
      }
    } catch (err) {
      setIsError(true);
      setValue(defaultValue);
      setTimeout(() => {
        setIsError(false);
      }, 2000);
    }
  };

  // useEffect(()=>{
  //   setPage({title:"Admin Login", isAdminPage:true, isLoggedin:false})
  // },[])


  return (
    <div className="login-form">
      <Grommet theme={grommet}>
        <Box fill align="center" justify="center">
          <Box width="medium">
            <Form
              value={value}
              onChange={(nextValue) => {
                setValue(nextValue);
              }}
              onReset={() => setValue(defaultValue)}
              onSubmit={handleSubmit}
            >
              <FormField label="Email" name="email" required>
                <MaskedInput
                  name="email"
                  mask={[
                    { regexp: /^[\w\-_.]+$/, placeholder: "example" },
                    { fixed: "@" },
                    { regexp: /^[\w]+$/, placeholder: "my" },
                    { fixed: "." },
                    { regexp: /^[\w]+$/, placeholder: "com" },
                  ]}
                />
              </FormField>
              <FormField label="Password" name="password">
                <TextInput
                  name="password"
                  type={value.reveal ? "text" : "password"}
                />
              </FormField>
              {isError && (
                <div className="error">Invalid email or password</div>
              )}
              <Button
                icon={
                  value.reveal ? <View size="medium" /> : <Hide size="medium" />
                }
                onClick={() => setValue({ ...value, reveal: !value.reveal })}
              />

              <Box direction="row" justify="between" margin={{ top: "medium" }}>
                <Button label="Cancel" onClick={handleCancel} />
                <Button type="submit" label="Login" primary />
              </Box>
            </Form>
          </Box>
        </Box>
      </Grommet>
    </div>
  );
};

export default Login;
