import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { useDebouncedCallback } from "use-debounce";
import { PlacesSearch } from "./PlacesSearch";
import { Place } from "../../graphql";
import { SearchPlacesData, SearchPlacesVars, SEARCH_PLACES } from "./PlacesSearch.graphql";

export interface PlacesSearchConnectorProps {
  onHover: (place: Place) => void;
  onClick: (place: Place) => void;
}

export function PlacesSearchConnector(props: PlacesSearchConnectorProps) {
  const [searchPlaces, { data }] = useLazyQuery<SearchPlacesData, SearchPlacesVars>(SEARCH_PLACES);
  const [places, setPlaces] = useState<Place[]>([]);

  const [debouncedSearch] = useDebouncedCallback(
    (query: string) => searchPlaces({ variables: { query } }),
    1000
  );

  useEffect(() => {
    setPlaces(data ? data.searchPlaces.places : []);
  }, [data]);

  function handleClick(place: Place) {
    setPlaces([]);
    props.onClick(place);
  }

  return (
    <PlacesSearch
      places={places}
      onSearch={debouncedSearch}
      onHover={props.onHover}
      onClick={handleClick}
    />
  );
}
