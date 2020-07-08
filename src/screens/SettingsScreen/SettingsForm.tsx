import * as Yup from "yup";

export type SettingsForm = Yup.InferType<typeof formSchema>;

export const formSchema = Yup.object().shape({
  name: Yup.string().required("Campo requerido"),
  avgLoadTime: Yup.number().required("Campo requerido"),
  latitude: Yup.number().required("Campo requerido"),
  longitude: Yup.number().required("Campo requerido")
});

export const initialValues: SettingsForm = {
  name: "",
  avgLoadTime: 0,
  longitude: -69.9788441,
  latitude: 18.4553052
};
