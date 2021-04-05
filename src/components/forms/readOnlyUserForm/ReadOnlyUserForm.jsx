import React from "react";
import {Form, withFormik} from "formik/dist/index";
import styles from "./ReadOnlyUserForm.module.scss";
import * as Yup from "yup";
import {NavLink, useHistory, useParams} from 'react-router-dom'
import Button from "../../UI/button";
import InputDatePicker from "../../UI/inputDatePicker";
import TextAreaField from "../../UI/textAreaField";
import InputField from "../../UI/inputField";
import {
  ACTIVE_CONTINUE,
  MAXIMUM_1024_CHARACTERS_MESSAGE, MAXIMUM_256_CHARACTERS_MESSAGE,
  REQUIRED_MESSAGE,
  STRING_MESSAGE,
  VALID_NAME_MESSAGE
} from "../../../helpers/validation-message";
import SelectInput from "../../UI/selectInput";
import InputCheckbox from "../../UI/inputCheckbox/InputCheckbox";

const ReadOnlyUserForm = ({
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
  const params = useParams();
  return (
    <Form name="ReadOnlyUserForm" className={styles.form}>
      <div className={styles.row}>
        <div className={`${styles.col4} ${styles.mb2}`}>
          <InputField
            label='Имя'
            placeholder="Введите имя"
            type="text"
            name="first_name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.first_name}
            error={(touched.first_name && errors.first_name) && errors.first_name}
            readOnly={true}
          />
        </div>
        <div className={`${styles.col4} ${styles.mb2}`}>
          <InputField
            label='Фамилия'
            placeholder="Введите фамилию"
            type="text"
            name="last_name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.last_name}
            error={(touched.last_name && errors.last_name) && errors.last_name}
            readOnly={true}
          />
        </div>

        <div className={`${styles.col4} ${styles.mb2}`}>
          <SelectInput
            options={[
              { value: 'male', label: 'male' },
              { value: 'female', label: 'female' },
            ]}
            label='Пол'
            defaultValue={{ value: values.gender, label: values.gender }}
            placeholder={{ value: values.gender, label: values.gender }}
            onChange={ (event) => {
              // handleStatusObj(event)
              setFieldValue('gender', event.value)
            }}
            error={(touched.gender && errors.gender) && errors.gender}
            readOnly={true}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={`${styles.col8} ${styles.mb2}`}>
          <InputField
            label='Профессия'
            placeholder="Введите ваше имя"
            type="text"
            name="job"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.job}
            error={(touched.job && errors.job) && errors.job}
            readOnly={true}
          />
        </div>
        <div className={`${styles.col4} ${styles.mb2}`}>
          <InputDatePicker
            label='Дата рождения'
            value={values.birth_date || ''}
            maxDate={new Date()}
            onChange={date => setFieldValue('birth_date', date)}
            error={(touched.birth_date && errors.birth_date) && errors.birth_date}
            readOnly={true}
          />
        </div>
      </div>
      <div className={`${styles.row} ${styles.mb4}`}>
        <div className={styles.col12}>
          <TextAreaField
            label='Биография'
            placeholder="Ваша Биография"
            name="biography"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.biography}
            error={(touched.biography && errors.biography) && errors.biography}
            height='137px'
            readOnly={true}
          />
        </div>
      </div>
      <div className={`${styles.mb4}`}>
        <InputCheckbox
          label={'Активировать Пользователя ?'}
          name="is_active"
          onChange={() => setFieldValue('is_active', !values.is_active )}
          onBlur={handleBlur}
          checked={values.is_active}
          error={(touched.is_active && errors.is_active) && errors.is_active}
          readOnly={true}
        />
      </div>

      <div className={styles.control}>
        <Button isSubmit={false} type={'outline'} onClick={() => history.goBack()}>Назад</Button>

        <Button isSubmit={false} type={'red'} onClick={props.handleDelete} disabled={isLoading}>Удалить</Button>
        <NavLink to={`/edit-user/${params.user_id}?`} className={styles.btnEdit}>Редактировать</NavLink>
      </div>
    </Form>
  )
}

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues({
                     first_name,
                     last_name,
                     birth_date,
                     biography,
                     gender,
                     job,
                     is_active
                   }) {

    return {
      first_name: first_name || '',
      last_name: last_name || '',
      birth_date: (birth_date && new Date(birth_date)) || '',
      biography: biography || '',
      gender: gender || '',
      job: job || '',
      is_active: is_active || '',
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
      .required(REQUIRED_MESSAGE),
    birth_date: Yup.string(STRING_MESSAGE)
      .required(REQUIRED_MESSAGE),
    biography: Yup.string(STRING_MESSAGE)
      .max(1024, MAXIMUM_1024_CHARACTERS_MESSAGE)
      .required(REQUIRED_MESSAGE),
    gender: Yup.string(STRING_MESSAGE)
      .required(REQUIRED_MESSAGE),
    job: Yup.string(STRING_MESSAGE)
      .required(REQUIRED_MESSAGE),
    is_active: Yup.boolean()
      .test('is-true', ACTIVE_CONTINUE, value => value === true),
  }),
  handleSubmit: ({ first_name, last_name, birth_date, biography, gender, job, is_active }, {props}) => {
    props.handleSubmit(first_name, last_name, birth_date, biography, gender, job, is_active);
  },
})(ReadOnlyUserForm);