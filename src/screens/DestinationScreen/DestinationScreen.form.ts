import * as Yup from "yup";
import { isMobilePhone } from "validator";

export type DestinationForm = Yup.InferType<typeof formSchema>;

export const formSchema = Yup.object().shape({
  name: Yup.string().required("Campo querido"),
  email: Yup.string()
    .email()
    .required("Campo querido"),
  phone: Yup.string()
    .test("isPhone", "Teléfono inválido", (value = "") => {
      return isMobilePhone(value, "any");
    })
    .required("Campo querido"),
  code: Yup.string().required("Campo querido"),
  references: Yup.string(),
  latitude: Yup.number().required("Campo requerido"),
  longitude: Yup.number().required("Campo requerido")
});

export const initialValues: DestinationForm = {
  name: "",
  email: "",
  phone: "",
  code: "",
  references: "",
  latitude: 0,
  longitude: 0
};
