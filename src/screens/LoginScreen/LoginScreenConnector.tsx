import React from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { LoginScreen } from "./LoginScreen";
import { LoginForm } from "./LoginScreen.form";
import { LOGIN, LoginData, LoginVariables } from "./LoginScreen.grahpql";

export function LoginScreenConnector() {
  const history = useHistory();
  const [login, { data }] = useMutation<LoginData, LoginVariables>(LOGIN);

  function handleSubmit(values: LoginForm) {
    const { username, password } = values;
    login({ variables: { username, password } });
  }

  React.useEffect(() => {
    if (data) {
      localStorage.setItem("token", data.login.jwt);
      history.replace("/dashboard");
    }
  }, [data]);

  return <LoginScreen onSubmit={handleSubmit} />;
}
