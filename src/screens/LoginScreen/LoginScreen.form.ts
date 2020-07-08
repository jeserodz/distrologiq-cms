import * as Yup from "yup";

export type LoginForm = Yup.InferType<typeof formSchema>;

export const formSchema = Yup.object().shape({
  username: Yup.string().required("Campo querido"),
  password: Yup.string().required("Campo requerido")
});

export const initialValues: LoginForm = {
  username: "",
  password: ""
};
