export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any,
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
};

export type CalculateRouteResponse = {
   __typename?: 'CalculateRouteResponse',
  distance: Scalars['Float'],
  duration: Scalars['Float'],
  durationWithLoadTime: Scalars['Float'],
  geometry: RouteGeometry,
  optimizedRouteStops: Array<RouteStop>,
};


export type Destination = {
   __typename?: 'Destination',
  id: Scalars['ID'],
  name: Scalars['String'],
  email: Scalars['String'],
  phone: Scalars['String'],
  code: Scalars['String'],
  references: Scalars['String'],
  longitude: Scalars['Float'],
  latitude: Scalars['Float'],
  isOwnCompany: Scalars['Boolean'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};


export type Mutation = {
   __typename?: 'Mutation',
  createUser: User,
  login: Token,
  setSettings: Settings,
  createDestination: Destination,
  updateDestination: Destination,
  removeDestination: Scalars['Boolean'],
  createRoute: Route,
  updateRoute: Route,
  removeRoute: Scalars['Boolean'],
  startRouteStop: RouteStop,
  completeRouteStop: RouteStop,
  calculateRoute: CalculateRouteResponse,
};


export type MutationCreateUserArgs = {
  username: Scalars['String'],
  password: Scalars['String'],
  displayName?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>
};


export type MutationLoginArgs = {
  password: Scalars['String'],
  username: Scalars['String']
};


export type MutationSetSettingsArgs = {
  name: Scalars['String'],
  avgLoadTime: Scalars['Float'],
  longitude: Scalars['Float'],
  latitude: Scalars['Float']
};


export type MutationCreateDestinationArgs = {
  name: Scalars['String'],
  email: Scalars['String'],
  phone: Scalars['String'],
  code: Scalars['String'],
  references: Scalars['String'],
  longitude: Scalars['Float'],
  latitude: Scalars['Float']
};


export type MutationUpdateDestinationArgs = {
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  phone?: Maybe<Scalars['String']>,
  code?: Maybe<Scalars['String']>,
  references?: Maybe<Scalars['String']>,
  longitude?: Maybe<Scalars['Float']>,
  latitude?: Maybe<Scalars['Float']>
};


export type MutationRemoveDestinationArgs = {
  id: Scalars['Int']
};


export type MutationCreateRouteArgs = {
  name: Scalars['String'],
  distance: Scalars['Float'],
  duration: Scalars['Float'],
  durationWithLoadTime: Scalars['Float'],
  geometry: Scalars['JSONObject'],
  stops: Array<Scalars['JSONObject']>,
  driver?: Maybe<Scalars['JSONObject']>
};


export type MutationUpdateRouteArgs = {
  id: Scalars['Int'],
  name?: Maybe<Scalars['String']>,
  distance?: Maybe<Scalars['Float']>,
  duration?: Maybe<Scalars['Float']>,
  durationWithLoadTime?: Maybe<Scalars['Float']>,
  geometry?: Maybe<Scalars['JSONObject']>,
  started?: Maybe<Scalars['DateTime']>,
  completed?: Maybe<Scalars['DateTime']>,
  completedDuration?: Maybe<Scalars['Float']>,
  stops?: Maybe<Array<Scalars['JSONObject']>>,
  driver?: Maybe<Scalars['JSONObject']>
};


export type MutationRemoveRouteArgs = {
  id: Scalars['ID']
};


export type MutationStartRouteStopArgs = {
  id: Scalars['ID'],
  startDatetime: Scalars['DateTime']
};


export type MutationCompleteRouteStopArgs = {
  id: Scalars['ID'],
  completionDatetime: Scalars['DateTime']
};


export type MutationCalculateRouteArgs = {
  routeStops: Array<Scalars['JSONObject']>
};

export type Place = {
   __typename?: 'Place',
  id: Scalars['ID'],
  name: Scalars['String'],
  latitude: Scalars['Float'],
  longitude: Scalars['Float'],
};

export type Query = {
   __typename?: 'Query',
  users: Array<User>,
  user: User,
  me: User,
  settings: Settings,
  destinations: Array<Destination>,
  destination: Destination,
  routes: Array<Route>,
  route?: Maybe<Route>,
  assignedRoutes: Array<Route>,
  routeStop: RouteStop,
  searchPlaces: SearchPlacesResponse,
};


export type QueryUserArgs = {
  id: Scalars['Float']
};


export type QueryDestinationArgs = {
  id: Scalars['ID']
};


export type QueryRouteArgs = {
  id?: Maybe<Scalars['ID']>
};


export type QueryRouteStopArgs = {
  id: Scalars['ID']
};


export type QuerySearchPlacesArgs = {
  query: Scalars['String']
};

export type Route = {
   __typename?: 'Route',
  id: Scalars['Int'],
  name: Scalars['String'],
  distance: Scalars['Float'],
  duration: Scalars['Float'],
  durationWithLoadTime: Scalars['Float'],
  geometry: RouteGeometry,
  started?: Maybe<Scalars['DateTime']>,
  completed?: Maybe<Scalars['DateTime']>,
  completedDuration?: Maybe<Scalars['Float']>,
  stops: Array<RouteStop>,
  driver?: Maybe<User>,
};

export type RouteGeometry = {
   __typename?: 'RouteGeometry',
  type: Scalars['String'],
  coordinates: Scalars['String'],
};

export type RouteStop = {
   __typename?: 'RouteStop',
  id?: Maybe<Scalars['Int']>,
  type: RouteStopType,
  destination: Destination,
  route?: Maybe<Route>,
  waypointIndex: Scalars['Int'],
  started?: Maybe<Scalars['DateTime']>,
  completed?: Maybe<Scalars['DateTime']>,
};

export enum RouteStopType {
  Delivery = 'DELIVERY',
  Pickup = 'PICKUP',
  DeliveryPickup = 'DELIVERY_PICKUP',
  Arrival = 'ARRIVAL'
}

export type SearchPlacesResponse = {
   __typename?: 'SearchPlacesResponse',
  places: Array<Place>,
};

export type Settings = {
   __typename?: 'Settings',
  uuid: Scalars['ID'],
  name: Scalars['String'],
  avgLoadTime: Scalars['Float'],
  destination: Destination,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};

export type Token = {
   __typename?: 'Token',
  id: Scalars['ID'],
  jwt: Scalars['String'],
  user: User,
  createdAt: Scalars['String'],
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  username: Scalars['String'],
  displayName: Scalars['String'],
  email?: Maybe<Scalars['String']>,
  roles: Scalars['JSONObject'],
  createdAt: Scalars['String'],
};

export type Waypoint = {
   __typename?: 'Waypoint',
  coordinates: Array<Scalars['Float']>,
};
