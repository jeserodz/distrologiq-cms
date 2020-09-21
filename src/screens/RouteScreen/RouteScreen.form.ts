import * as Yup from "yup";
import { RouteStop, RouteGeometry, User, RouteStopTypeEnum } from "../../api";

export interface RouteForm {
  name: string;
  stops: RouteStop[];
  driver?: User | undefined;
  distance: number;
  duration: number;
  durationWithLoadTime: number;
  geometry: RouteGeometry | undefined;
  started?: Date | undefined;
  completed?: Date | undefined;
}

export const initialValues: RouteForm = {
  name: "",
  stops: [],
  driver: undefined,
  distance: 0,
  duration: 0,
  durationWithLoadTime: 0,
  geometry: undefined,
  started: undefined,
  completed: undefined,
};

export const formSchema = Yup.object().shape({
  name: Yup.string().required("Campo requerido"),
  stops: Yup.array()
    .of(
      Yup.object().shape({
        type: Yup.mixed<RouteStopTypeEnum>().required(),
        destination: Yup.object().required(),
        started: Yup.date().nullable(),
        completed: Yup.date().nullable(),
      })
    )
    .min(1)
    .required(),
  driver: Yup.mixed().nullable(),
  distance: Yup.number().required(),
  duration: Yup.number().required(),
  durationWithLoadTime: Yup.number().required(),
  geometry: Yup.object().nullable().required(),
  started: Yup.date().nullable(),
  completed: Yup.date().nullable(),
});
