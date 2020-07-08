import { Action, action, Thunk, thunk } from "easy-peasy";
import { FirebaseService } from "../services/FirebaseService";
import { Destination } from "@distrologiq/common";
import { DestinationForm } from "../screens/DestinationScreen/DestinationScreen.form";

export interface DestinationsModel {
  loading: boolean;
  destinations: Destination[];
  destination: Destination | null;
  setLoading: Action<DestinationsModel, boolean>;
  setDestinations: Action<DestinationsModel, Destination[]>;
  setDestination: Action<DestinationsModel, Destination | null>;
  fetchDestinations: Thunk<DestinationsModel, void>;
  fetchDestination: Thunk<DestinationsModel, string>;
  createDestination: Thunk<DestinationsModel, DestinationForm>;
  updateDestination: Thunk<DestinationsModel, Destination>;
}

export const destinationsModel: DestinationsModel = {
  loading: false,
  destinations: [],
  destination: null,

  setLoading: action((state, loading) => {
    state.loading = loading;
  }),

  setDestinations: action((state, payload) => {
    state.destinations = payload;
  }),

  setDestination: action((state, payload) => {
    state.destination = payload;
  }),

  fetchDestinations: thunk(async (actions, payload) => {
    actions.setLoading(true);
    const destinations = await FirebaseService.fetchDestinations();
    actions.setDestinations(destinations);
    actions.setLoading(false);
  }),

  fetchDestination: thunk(async (actions, payload) => {
    actions.setLoading(true);
    const destination = await FirebaseService.fetchDestination(payload);
    actions.setDestination(destination);
    actions.setLoading(false);
  }),

  createDestination: thunk(async (actions, payload): Promise<Destination> => {
    actions.setLoading(true);
    const destination = await FirebaseService.createDestination(payload);
    actions.setLoading(false);
    console.log({ destination });
    return destination;
  }),

  updateDestination: thunk(async (actions, payload): Promise<Destination> => {
    actions.setLoading(true);
    const destination = await FirebaseService.updateDestination(payload);
    actions.setLoading(false);
    console.log({ destination });
    return destination;
  }),
};
