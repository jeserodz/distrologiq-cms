export class FormikUtils<FormikInstance extends any> {
  private formik: FormikInstance;
  private validateAfterSubmit: boolean;

  constructor(options: {
    formik: FormikInstance;
    validateAfterSubmit?: boolean;
  }) {
    this.formik = options.formik;
    this.validateAfterSubmit = options.validateAfterSubmit ?? false;
  }

  fieldHasError(field: keyof FormikInstance['errors']) {
    if (this.validateAfterSubmit && this.formik.submitCount === 0) {
      return false;
    }

    return !!this.formik.errors[field];
  }

  getFieldHint(
    field: keyof FormikInstance['errors'],
    helperText?: string
  ): string {
    if (this.validateAfterSubmit && this.formik.submitCount === 0) {
      return helperText || '';
    }

    return this.formik.errors[field] || helperText || '';
  }
}
