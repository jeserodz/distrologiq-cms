import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { DashboardLinks } from "./DaskboardLinks";
import { DashboardSidebar } from "./DashboardSidebar";
import { UsersScreen } from "../../screens/UsersScreen";
import { UserScreenConnector } from "../../screens/UserScreen";
import { DestinationsScreenConnector } from "../../screens/DestinationsScreen";
import { DestinationScreenConnector } from "../../screens/DestinationScreen";
import { RouteScreenConnector } from "../../screens/RouteScreen";
import { RoutesScreenConnector } from "../../screens/RoutesScreen";
import { SettingsScreenConnector } from "../../screens/SettingsScreen";
import "./Dashboard.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    toolbar: theme.mixins.toolbar
  })
);

export function Dashboard() {
  const classes = useStyles();
  const history = useHistory();

  function handleSidebarPress(link: DashboardLinks) {
    switch (link) {
      case DashboardLinks.Logout:
        // TODO: Implement logout with GraphQL
        return null;
      default:
        return history.push(link);
    }
  }

  return (
    <div className="Dashboard">
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap>
            Distrologiq
          </Typography>
        </Toolbar>
      </AppBar>

      <DashboardSidebar onPress={handleSidebarPress} />

      <div className="Dasboard_Content">
        <div className={classes.toolbar} />
        <Switch>
          <Redirect exact from="/dashboard" to="/dashboard/settings" />
          <Route exact path="/dashboard/users">
            <UsersScreen />
          </Route>
          <Route exact path="/dashboard/users/:id">
            <UserScreenConnector />
          </Route>
          <Route exact path="/dashboard/destinations">
            <DestinationsScreenConnector />
          </Route>
          <Route exact path="/dashboard/destinations/new">
            <DestinationScreenConnector />
          </Route>
          <Route exact path="/dashboard/destinations/:id">
            <DestinationScreenConnector />
          </Route>
          <Route exact path="/dashboard/routes">
            <RoutesScreenConnector />
          </Route>
          <Route exact path="/dashboard/routes/new">
            <RouteScreenConnector />
          </Route>
          <Route exact path="/dashboard/routes/:id">
            <RouteScreenConnector />
          </Route>
          <Route exact path="/dashboard/settings">
            <SettingsScreenConnector />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
