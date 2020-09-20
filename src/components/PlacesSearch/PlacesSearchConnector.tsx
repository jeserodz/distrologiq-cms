import React, { useState, useContext } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { PlacesSearch } from './PlacesSearch';
import { Place, MapsApi } from '../../api';
import { Context } from '../../Context';

export interface PlacesSearchConnectorProps {
  onHover: (place: Place) => void;
  onClick: (place: Place) => void;
}

export function PlacesSearchConnector(props: PlacesSearchConnectorProps) {
  const context = useContext(Context);
  const [places, setPlaces] = useState<Place[]>([]);

  const mapsApi = new MapsApi(context.getApiConfig());

  async function handleSearch(searchQuery: string) {
    const data = await mapsApi.searchPlaces(searchQuery!);
    setPlaces(data.places);
  }

  const [debouncedSearch] = useDebouncedCallback(handleSearch, 1000);

  function handleClick(place: Place) {
    setPlaces([]);
    props.onClick(place);
  }

  return (
    <PlacesSearch
      places={places}
      onSearch={(query) => debouncedSearch(query)}
      onHover={props.onHover}
      onClick={handleClick}
    />
  );
}
