import React from "react";
import { Paper, TextField } from "@material-ui/core";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Place } from "../../api";
import "./PlacesSearch.css";

export interface PlacesSearchProps {
  places: Place[];
  onSearch: (query: string) => void;
  onHover: (place: Place) => void;
  onClick: (place: Place) => void;
}

export function PlacesSearch(props: PlacesSearchProps) {
  const [searchText, setSearchText] = React.useState("");

  function handleChange(value: string) {
    setSearchText(value);
    props.onSearch(value);
  }

  function handleClick(place: Place) {
    props.onClick(place);
    setSearchText("");
  }

  return (
    <div className="PlacesSearch">
      <Paper className="PlacesSearch_Container">
        <TextField
          label="Buscar Destino"
          value={searchText}
          onChange={(e) => handleChange(e.target.value)}
        />
        <List>
          {props.places.map((p) => (
            <ListItem
              button
              onMouseOver={() => props.onHover(p)}
              onClick={() => handleClick(p)}
              key={p.id}
            >
              <ListItemText primary={p.name} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
}
