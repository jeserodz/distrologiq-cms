import * as Yup from "yup";
import { User } from "../../api";

export type UserForm = Yup.InferType<typeof formSchema>;

export const formSchema = Yup.object().shape({
  id: Yup.number().required("Campo querido"),
  username: Yup.string().required("Campo querido"),
  displayName: Yup.string().required("Campo querido"),
  email: Yup.string().email().required("Campo querido"),
  password: Yup.string().required("Campo querido"),
  roles: Yup.string().required("Campo querido"),
});

export const initialValues: Partial<User> = {
  id: 0,
  username: "",
  displayName: "",
  email: "",
  password: "",
  roles: {
    admin: true,
    driver: true,
  },
};
