import * as firebase from "firebase";
import { Store } from "easy-peasy";
import { StoreModel } from "./_store";

export const observers = {
  /**
   * Updates the auth state from Firebase events.
   * Used to auto sign-in user from active session.
   * @param store Redux store
   */
  onFirebaseAuthStateChanges(store: Store<StoreModel>) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        store.getActions().auth.setUser(user);
      } else {
        store.getActions().auth.setUser(null);
      }
    });
  }
};
