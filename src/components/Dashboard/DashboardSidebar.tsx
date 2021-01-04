import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Drawer, Divider } from "@material-ui/core";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { Map, Room, Group, Settings, ExitToApp } from "@material-ui/icons";
import { DashboardLinks } from "./DaskboardLinks";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
  })
);

export interface DashboardSidebarProps {
  onPress: (link: DashboardLinks) => void;
  window?: () => Window;
}

export function DashboardSidebar(props: DashboardSidebarProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(window.innerWidth <= 600 === false);

  // toggles sidebar when screen resizes
  useEffect(() => {
    function resizeHandler() {
      setOpen(window.innerWidth <= 600 === false);
    }

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar} />
      <List>
        <ListItem button onClick={() => props.onPress(DashboardLinks.Routes)}>
          <ListItemIcon>
            <Map />
          </ListItemIcon>
          <ListItemText primary="Rutas" />
        </ListItem>
        <ListItem
          button
          onClick={() => props.onPress(DashboardLinks.Destinations)}
        >
          <ListItemIcon>
            <Room />
          </ListItemIcon>
          <ListItemText primary="Destinos" />
        </ListItem>
        <ListItem button onClick={() => props.onPress(DashboardLinks.Users)}>
          <ListItemIcon>
            <Group />
          </ListItemIcon>
          <ListItemText primary="Usuarios" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => props.onPress(DashboardLinks.Settings)}>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Configuración" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => props.onPress(DashboardLinks.Logout)}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Salir" />
        </ListItem>
      </List>
    </Drawer>
  );
}
