import { Action, action, Thunk, thunk } from "easy-peasy";
import { FirebaseService } from "../services/FirebaseService";
import { User } from "@distrologiq/common";

export interface UsersModel {
  loading: boolean;
  users: User[];
  setLoading: Action<UsersModel, boolean>;
  setUsers: Action<UsersModel, User[]>;
  fetchUsers: Thunk<UsersModel, void>;
}

export const usersModel: UsersModel = {
  loading: false,
  users: [],

  setLoading: action((state, loading) => {
    state.loading = loading;
  }),

  setUsers: action((state, payload) => {
    state.users = payload;
  }),

  fetchUsers: thunk(async (actions, payload) => {
    actions.setLoading(true);
    const users = await FirebaseService.fetchUsers();
    actions.setUsers(users);
    actions.setLoading(false);
  })
};
