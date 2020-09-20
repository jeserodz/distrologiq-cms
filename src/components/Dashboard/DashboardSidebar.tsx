import React from "react";
import { Drawer } from "@material-ui/core";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Divider, makeStyles, createStyles, Theme } from "@material-ui/core";
import { Map, Room, Group, Settings, ExitToApp } from "@material-ui/icons";
import { DashboardLinks } from "./DaskboardLinks";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    toolbar: theme.mixins.toolbar
  })
);

export interface DashboardSidebarProps {
  onPress: (link: DashboardLinks) => void;
}

export function DashboardSidebar(props: DashboardSidebarProps) {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
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
