export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface Place {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}
