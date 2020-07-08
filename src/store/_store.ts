import { authModel, AuthModel } from "./auth";
import { usersModel, UsersModel } from "./users";
import { destinationsModel, DestinationsModel } from "./destinations";
import { searchModel, SearchModel } from "./search";

export interface StoreModel {
  auth: AuthModel;
  users: UsersModel;
  destinations: DestinationsModel;
  search: SearchModel;
}

export const storeModel: StoreModel = {
  auth: authModel,
  users: usersModel,
  destinations: destinationsModel,
  search: searchModel
};
