import { Action, action, Thunk, thunk } from "easy-peasy";
import { FirebaseService } from "../services/FirebaseService";
import { Place } from "../types";

export interface SearchModel {
  loading: boolean;
  places: Place[];
  setLoading: Action<SearchModel, boolean>;
  setPlaces: Action<SearchModel, Place[]>;
  searchPlaces: Thunk<SearchModel, string>;
}

export const searchModel: SearchModel = {
  loading: false,
  places: [],

  setLoading: action((state, loading) => {
    state.loading = loading;
  }),

  setPlaces: action((state, payload) => {
    state.places = payload;
  }),

  searchPlaces: thunk(async (actions, payload) => {
    actions.setLoading(true);
    const places = await FirebaseService.searchPlaces(payload);
    actions.setPlaces(places);
    actions.setLoading(false);
  })
};
