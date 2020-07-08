import * as Yup from "yup";
import {
  Route,
  RouteStop,
  RouteStopType,
  RouteGeometry,
  User,
  Destination,
  Settings
} from "../../graphql";

export interface RouteForm {
  name: string;
  stops: RouteStop[];
  driver?: User | null;
  distance: number;
  duration: number;
  durationWithLoadTime: number;
  geometry: RouteGeometry | null;
  started?: Date | null;
  completed?: Date | null;
}

export const initialValues: RouteForm = {
  name: "",
  stops: [],
  driver: null,
  distance: 0,
  duration: 0,
  durationWithLoadTime: 0,
  geometry: null,
  started: null,
  completed: null
};

export const formSchema = Yup.object().shape({
  name: Yup.string().required("Campo requerido"),
  stops: Yup.array()
    .of(
      Yup.object().shape({
        type: Yup.mixed<RouteStopType>().required(),
        destination: Yup.object().required(),
        started: Yup.date().nullable(),
        completed: Yup.date().nullable()
      })
    )
    .min(1)
    .required(),
  driver: Yup.mixed().nullable(),
  distance: Yup.number().required(),
  duration: Yup.number().required(),
  durationWithLoadTime: Yup.number().required(),
  geometry: Yup.object()
    .nullable()
    .required(),
  started: Yup.date().nullable(),
  completed: Yup.date().nullable()
});
