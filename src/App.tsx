import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { ApolloProvider } from "@apollo/react-hooks";
import { StoreProvider } from "easy-peasy";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthGuard } from "./components/AuthGuard";
import { Dashboard } from "./components/Dashboard";
import { LoginScreenConnector } from "./screens/LoginScreen";
import { theme } from "./utils/theme";
import { store } from "./store";
import { client } from "./utils/graphql-client";

const App = () => {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <StoreProvider store={store}>
          <MuiThemeProvider theme={theme}>
            <Router>
              <Switch>
                <Redirect exact from="/" to="/login" />
                <Route path="/login">
                  <LoginScreenConnector />
                </Route>
                <Route path="/dashboard">
                  <AuthGuard>
                    <Dashboard />
                  </AuthGuard>
                </Route>
              </Switch>
            </Router>
          </MuiThemeProvider>
        </StoreProvider>
      </ApolloProvider>
    </div>
  );
};

export default App;
