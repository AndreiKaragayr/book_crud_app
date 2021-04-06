import React from "react";
import {Form, withFormik} from "formik/dist/index";
import styles from "./AddAuthorForm.module.scss";
import * as Yup from "yup";
import Button from "../../UI/button";
import InputField from "../../UI/inputField";
import {
  MAXIMUM_256_CHARACTERS_MESSAGE,
  REQUIRED_MESSAGE,
  STRING_MESSAGE,
  VALID_NAME_MESSAGE
} from "../../../helpers/validation-message";

const AddAuthorForm = ({
                           isLoading,
                           values,
                           touched,
                           errors,
                           handleChange,
                           handleBlur,
                           setFieldValue,
                           ...props
                         }) => {
  return (
    <Form name="addAuthorForm" className={styles.form}>

      <div className="row align-items-start">
        <div className="col-md-5 mb-4">
            <InputField
              label='Имя'
              placeholder="Введите имя"
              type="text"
              name="first_name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.first_name}
              error={(touched.first_name && errors.first_name) && errors.first_name}
            />
        </div>
        <div className="col-md-5 mb-4">
          <InputField
            label='Фамилия'
            placeholder="Введите фамилию"
            type="text"
            name="last_name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.last_name}
            error={(touched.last_name && errors.last_name) && errors.last_name}
          />
        </div>
        <div className={`col-md-2 d-flex justify-content-md-end justify-content-center mb-4 ${styles.control}`}>
          <Button onClick={props.handleSubmit} disabled={isLoading}>Добывить</Button>
        </div>
      </div>
    </Form>
  )
}

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues() {
    return {
      first_name: '',
      last_name: ''
    };
  },
  validationSchema: Yup.object().shape({
    first_name: Yup.string(STRING_MESSAGE)
      .min(2, VALID_NAME_MESSAGE)
      .max(256, MAXIMUM_256_CHARACTERS_MESSAGE)
      .required(REQUIRED_MESSAGE),
    last_name: Yup.string(STRING_MESSAGE)
      .min(2, VALID_NAME_MESSAGE)
      .max(256, MAXIMUM_256_CHARACTERS_MESSAGE)
      .required(REQUIRED_MESSAGE)
  }),
  handleSubmit: ({ first_name, last_name }, {props}) => {
    props.handleSubmit(first_name, last_name);
  },
})(AddAuthorForm);
