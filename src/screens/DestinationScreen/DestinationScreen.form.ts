import * as Yup from 'yup';
import { isMobilePhone } from 'validator';
import { CreateDestinationDTO } from '../../api';

export const formSchema = Yup.object().shape<CreateDestinationDTO>({
  name: Yup.string().required('Campo querido'),
  email: Yup.string().email('Email inválido'),
  phone: Yup.string().test('isPhone', 'Teléfono inválido', (value = '') => {
    if (value === '') return true;
    return isMobilePhone(value, 'any');
  }),
  code: Yup.string(),
  references: Yup.string(),
  latitude: Yup.number().required('Campo requerido'),
  longitude: Yup.number().required('Campo requerido'),
});

export const initialValues: CreateDestinationDTO = {
  name: '',
  email: '',
  phone: '',
  code: '',
  references: '',
  latitude: 0,
  longitude: 0,
};
