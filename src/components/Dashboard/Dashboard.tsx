import React from "react";
import { RouteComponentProps, useNavigate } from "@reach/router";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { DashboardLinks } from "./DaskboardLinks";
import { DashboardSidebar } from "./DashboardSidebar";
import "./Dashboard.css";
import { AuthGuard } from "../AuthGuard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
  })
);

interface Props extends RouteComponentProps {
  children: React.ReactNode;
}

export function Dashboard(props: Props) {
  const classes = useStyles();
  const navigate = useNavigate();

  function handleSidebarPress(link: DashboardLinks) {
    switch (link) {
      case DashboardLinks.Logout:
        return navigate("/login", { replace: true });
      default:
        return navigate(link);
    }
  }

  return (
    <AuthGuard loggedIn>
      <div className="Dashboard">
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar>
            <Typography variant="h6" noWrap>
              Distrologiq
            </Typography>
          </Toolbar>
        </AppBar>

        <DashboardSidebar onPress={handleSidebarPress} />

        <div className="Dashboard_Content">
          <div className={classes.toolbar} />
          <div className="Dashboard_Outlet">{props.children}</div>
        </div>
      </div>
    </AuthGuard>
  );
}
