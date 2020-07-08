import { FirebaseService } from "../services/FirebaseService";

export interface Injections {
  FirebaseService: typeof FirebaseService;
}

export const injections: Injections = {
  FirebaseService: FirebaseService
};
