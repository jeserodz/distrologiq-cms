import * as Yup from 'yup';
import { CreateRouteDTO, UpdateRouteDTO } from '../../api';

export type RouteScreenForm = CreateRouteDTO | UpdateRouteDTO;

export const initialValues: any = {
  name: '',
  stops: [],
  driver: undefined,
  avgLoadTime: 0,
  estimatedStartDate: null,
  estimatedEndDate: null,
  distance: undefined,
  duration: undefined,
  durationWithLoadTime: undefined,
  geometry: undefined,
  started: undefined,
  completed: undefined,
};

export const formSchema = Yup.object().shape({
  name: Yup.string().required('Campo requerido').nullable(),
  stops: Yup.array()
    .of(
      Yup.object().shape({
        type: Yup.mixed().required(),
        destination: Yup.object().required(),
      })
    )
    .min(1)
    .required(),
  driver: Yup.mixed().nullable(),
  avgLoadTime: Yup.number().min(0),
  estimatedStartDate: Yup.date().nullable(),
  estimatedEndDate: Yup.date().nullable(),
  distance: Yup.number().moreThan(0).nullable().required(),
  duration: Yup.number().moreThan(0).nullable().required(),
  durationWithLoadTime: Yup.number().moreThan(0).nullable().required(),
  geometry: Yup.object().nullable().required(),
  started: Yup.date().nullable(),
  completed: Yup.date().nullable(),
});
