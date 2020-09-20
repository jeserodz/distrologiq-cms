import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthGuard } from './components/AuthGuard';
import { Dashboard } from './components/Dashboard';
import { LoginScreenConnector } from './screens/LoginScreen';
import { theme } from './utils/theme';

const App = () => {
  return (
    <div className="App">
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
    </div>
  );
};

export default App;
