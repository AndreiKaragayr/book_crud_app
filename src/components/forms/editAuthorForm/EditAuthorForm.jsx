import React from "react";
import {Form, withFormik} from "formik/dist/index";
import styles from "./EditAuthorForm.module.scss";
import * as Yup from "yup";
import Button from "../../UI/button";
import InputField from "../../UI/inputField";
import {
  MAXIMUM_256_CHARACTERS_MESSAGE,
  REQUIRED_MESSAGE,
  STRING_MESSAGE,
  VALID_NAME_MESSAGE
} from "../../../helpers/validation-message";
import {useHistory} from "react-router-dom";

const EditAuthorForm = ({
                           isLoading,
                           values,
                           touched,
                           errors,
                           handleChange,
                           handleBlur,
                           setFieldValue,
                           ...props
                         }) => {
  const history = useHistory();
  return (
    <Form name="editAuthorForm" className={styles.form}>

      <div className="table-responsive my-4">
        <table className="table table-bordered table-hover">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
          </tr>
          </thead>
          <tbody>
            <tr className={styles.tr}>
              <th scope="row"> </th>
              <td>
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
              </td>
              <td>
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
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-end">
        <div className='ml-4'>
          <Button view={'btn-secondary'} onClick={() => history.goBack()}>Назад</Button>
        </div>
        <div className='ml-4'>
          <Button onClick={props.handleSubmit} disabled={isLoading}>Сохранить</Button>
        </div>
      </div>
    </Form>
  )
}

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues({author}) {
    return {
      first_name: author.first_name || '',
      last_name: author.last_name || ''
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
})(EditAuthorForm);
