import React, { useState, useContext } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { PlacesSearch } from './PlacesSearch';
import { AuthContext } from '../../contexts/AuthContext';
import { MapsApi, Place } from 'distrologiq-sdk';
import { config } from '../../utils/config';

export interface PlacesSearchConnectorProps {
  onHover: (place: Place) => void;
  onClick: (place: Place) => void;
}

export function PlacesSearchConnector(props: PlacesSearchConnectorProps) {
  const auth = useContext(AuthContext);
  const [places, setPlaces] = useState<Place[]>([]);

  const mapsApi = new MapsApi({
    basePath: config.API_URL,
    accessToken: auth.accessToken!,
  });

  async function handleSearch(searchQuery: string) {
    const results = await mapsApi.mapsControllerSearchPlaces(searchQuery!);
    setPlaces(results.places);
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
