export class AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export class Place {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}
