import { Action, action, Thunk, thunk } from "easy-peasy";
import { Injections } from "./_injections";
import { AuthUser } from "../types";

export interface AuthModel {
  loading: boolean;
  user: AuthUser | null;
  setLoading: Action<AuthModel, boolean>;
  setUser: Action<AuthModel, AuthUser | null>;
  login: Thunk<AuthModel, { email: string; password: string }, Injections>;
  logout: Thunk<AuthModel, void, Injections>;
}

export const authModel: AuthModel = {
  loading: false,
  user: null,

  setLoading: action((state, loading) => {
    state.loading = loading;
  }),

  setUser: action((state, payload) => {
    state.user = payload;
  }),

  login: thunk(async (actions, payload, { injections }) => {
    const { FirebaseService } = injections;
    actions.setLoading(true);
    const user = await FirebaseService.login(payload.email, payload.password);
    actions.setUser(user);
    actions.setLoading(false);
  }),

  logout: thunk(async (actions, _, { injections }) => {
    const { FirebaseService } = injections;
    await FirebaseService.logout();
    actions.setUser(null);
  })
};
