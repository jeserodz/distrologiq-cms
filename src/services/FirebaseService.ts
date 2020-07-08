import * as firebase from "firebase";
import { Toaster } from "../utils/toaster";
import { AuthUser, Place } from "../types";
import { User, Destination } from "@distrologiq/common";
import { DestinationForm } from "../screens/DestinationScreen/DestinationScreen.form";

firebase.initializeApp({
  apiKey: "AIzaSyChUX86l2KuoST7W8B4Kr9SBwR9yt4fNs4",
  authDomain: "distrologiq-dev.firebaseapp.com",
  databaseURL: "https://distrologiq-dev.firebaseio.com",
  projectId: "distrologiq-dev",
  storageBucket: "distrologiq-dev.appspot.com",
  messagingSenderId: "966928081095",
  appId: "1:966928081095:web:653c3222b6751ab9f71ee2",
  measurementId: "G-0LBP6FHH09"
});

const auth = firebase.auth();
const db = firebase.firestore();
const functions = firebase.functions();

if (process.env.NODE_ENV === "development") {
  functions.useFunctionsEmulator("http://localhost:5000");
  // db.settings({ host: "localhost:8080", ssl: false,  });
}

export const FirebaseService = {
  /**
   * Sign in Firebase Auth user with email and password.
   * @param email
   * @param password
   */
  async login(email: string, password: string): Promise<AuthUser> {
    try {
      const session = await auth.signInWithEmailAndPassword(email, password);
      if (!session.user) throw Error("Login Error: User unavilable");
      return session.user;
    } catch (e) {
      Toaster.show("error", e.toString());
      throw e;
    }
  },

  /**
   * Sign out Firebase Auth user.
   */
  async logout() {
    await auth.signOut();
    return;
  },

  /**
   * Fetch users from Firebase
   */
  async fetchUsers(): Promise<User[]> {
    try {
      const usersRef = db.collection("users");
      const snapshot = await usersRef.get();
      const users = snapshot.docs.map(d => User.parse(d));
      console.log(users);
      return users;
    } catch (e) {
      Toaster.show("error", e.toString());
      throw e;
    }
  },

  /**
   * Fetch destinations from Firebase
   */
  async fetchDestinations(): Promise<Destination[]> {
    try {
      const destinationsRef = db.collection("destinations");
      const snapshot = await destinationsRef.get();
      const destinations = snapshot.docs.map(d => Destination.fromData(d));
      return destinations;
    } catch (e) {
      Toaster.show("error", e.toString());
      throw e;
    }
  },

  /**
   * Fetch destination from Firebase
   */
  async fetchDestination(id: string): Promise<Destination> {
    try {
      const ref = db.collection("destinations").doc(id);
      const snapshot = await ref.get();
      return Destination.fromData(snapshot);
    } catch (e) {
      Toaster.show("error", e.toString());
      throw e;
    }
  },

  /**
   * Create destination in Firebase
   */
  async updateDestination(destination: Destination): Promise<Destination> {
    try {
      const { id, ...data } = destination;
      const ref = db.collection("destinations").doc(id);
      await ref.update(data);
      const snapshot = await ref.get();
      return Destination.fromData(snapshot);
    } catch (e) {
      Toaster.show("error", e.toString());
      throw e;
    }
  },

  /**
   * Create destination in Firebase
   */
  async createDestination(data: DestinationForm): Promise<Destination> {
    try {
      const ref = db.doc(`/destinations/dest_${Date.now()}`);
      await ref.set(data);
      const snapshot = await ref.get();
      return Destination.fromData(snapshot);
    } catch (e) {
      Toaster.show("error", e.toString());
      throw e;
    }
  },

  /**
   * Search places using Mapbox
   */
  async searchPlaces(query: string): Promise<Place[]> {
    const result = await functions.httpsCallable("searchPlaces")({ query });
    return result.data;
  }
};
