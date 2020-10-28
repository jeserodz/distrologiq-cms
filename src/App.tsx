import React, { useContext } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { Router, Redirect } from '@reach/router';
import { MuiThemeProvider } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Dashboard } from './components/Dashboard';
import { LoginScreenConnector } from './screens/LoginScreen';
import { UsersScreenConnector } from './screens/UsersScreen';
import { UserScreenConnector } from './screens/UserScreen';
import { UserAnalyticsScreen } from './screens/UserAnalyticsScreen/UserAnalyticsScreen';
import { DestinationsScreenConnector } from './screens/DestinationsScreen';
import { DestinationScreenConnector } from './screens/DestinationScreen';
import { RoutesScreenConnector } from './screens/RoutesScreen';
import { RouteScreenConnector } from './screens/RouteScreen';
import { SettingsScreenConnector } from './screens/SettingsScreen';
import { Context } from './Context';
import { theme } from './utils/theme';

const App = () => {
  const context = useContext(Context);
  context.load();

  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Router primary={false} height="100%">
            <Redirect from="/" to="/login" noThrow />
            <LoginScreenConnector path="/login" />
            <Dashboard path="/dashboard">
              <Redirect from="/" to="./settings" noThrow />
              <UsersScreenConnector path="/users" />
              <UserScreenConnector path="/users/:id" />
              <UserAnalyticsScreen path="/users/:id/analytics" />
              <DestinationsScreenConnector path="/destinations" />
              <DestinationScreenConnector path="/destinations/:id" />
              <RoutesScreenConnector path="/routes" />
              <RouteScreenConnector path="/routes/:id" />
              <SettingsScreenConnector path="/settings" />
            </Dashboard>
          </Router>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </div>
  );
};

export default App;
