import React, {useEffect, useState} from "react";
import {Form, withFormik} from "formik/dist/index";
import styles from "./AddAuthorForm.module.scss";
import * as Yup from "yup";
import Button from "../../UI/button";
import InputField from "../../UI/inputField";
import {
  MAXIMUM_256_CHARACTERS_MESSAGE, NUMBER_MESSAGE,
  REQUIRED_MESSAGE,
  STRING_MESSAGE,
  VALID_NAME_MESSAGE, VALID_NUMBER_MESSAGE
} from "../../../helpers/validation-message";
import SelectInput from "../../UI/selectInput";
import EmptyImageSVG from "../../iconsSVG/EmptyImageSVG";
import CloseSVG from "../../iconsSVG/CloseSVG";

const AddBookForm = ({
                       authorsOptions,
                       isLoading,
                       values,
                       touched,
                       errors,
                       handleChange,
                       handleBlur,
                       setFieldValue,
                       ...props
                     }) => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    if(authorsOptions && authorsOptions.length){
      let lists = authorsOptions.map(a => {
        return {
          value: a.id, label: a.first_name +' '+ a.last_name
        }
      })
      return setOptions(lists)
    }
  }, [authorsOptions])
  return (
    <Form name="addBookForm" className={styles.form}>
      <div className="row align-items-center justify-content-center justify-content-md-start">
        <div className={styles.inner2}>
          <div className={styles.file}>
            <label htmlFor="formFile" className={styles.preview}>
              {
                values.image ?
                  <>
                    <div className={styles.removeImage} onClick={() => setFieldValue("image", '')}>
                      <CloseSVG/>
                    </div>
                    <img src={values.image && values.image} alt="preview"/>
                  </>

                  :
                  <EmptyImageSVG/>
              }
            </label>
            <input
              accept="image/gif, image/jpeg, image/jpg, image/png"
              multiple={false}
              className="form-control"
              type="file"
              name="image"
              id="formFile"
              onChange={(event) => {
                let response = event.target.files[0];

                if (response) {
                  let reader = new FileReader();
                  reader.readAsDataURL(response);
                  reader.onload = function (e) {
                    setFieldValue("image", e.target.result);
                  }
                }
              }}
            />

            {(touched.image && errors.image) && <div className={styles.errorMessage}>{errors.image}</div>}
          </div>
        </div>
        <div className={styles.inner8}>
          <div className="row">
            <div className="col-12 col-md-5 mb-2 mb-md-0">
              <InputField
                label='Название книги'
                placeholder="Введите название книги"
                type="text"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                error={(touched.title && errors.title) && errors.title}
              />
            </div>
            <div className="col-12 col-md-4 mb-2 mb-md-0">
              <SelectInput
                options={options}
                label='Автор'
                defaultValue={{value: '', label: ''}}
                placeholder={{value: '', label: ''}}
                onChange={(event) => {
                  setFieldValue('author_id', event.value)
                }}
                error={(touched.author_id && errors.author_id) && errors.author_id}
              />
            </div>
            <div className="col-12 col-md-3 mb-2 mb-md-0">
              <InputField
                label='Первая публикация'
                placeholder="2010"
                type="number"
                name="year"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.year}
                error={(touched.year && errors.year) && errors.year}
              />
            </div>
          </div>
        </div>
        <div className={styles.inner2}>
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
      image: '',
      title: '',
      author_id: '',
      created_at: new Date() || '',
      year: '',
    };
  },
  validationSchema: Yup.object().shape({
    image: Yup.string(),
    author_id: Yup.string()
      .required(REQUIRED_MESSAGE),
    title: Yup.string(STRING_MESSAGE)
      .min(2, VALID_NAME_MESSAGE)
      .max(256, MAXIMUM_256_CHARACTERS_MESSAGE)
      .required(REQUIRED_MESSAGE),
    year: Yup.string(NUMBER_MESSAGE)
      .min(4, VALID_NUMBER_MESSAGE)
      .required(REQUIRED_MESSAGE)
  }),
  handleSubmit: ({image, title, author_id, created_at, year}, {props}) => {
    props.handleSubmit(image, title, author_id, created_at, year);
  },
})(AddBookForm);
