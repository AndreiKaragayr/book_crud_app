import React, {useEffect, useState} from "react";
import {Form, withFormik} from "formik/dist/index";
import styles from "./EditBooksForm.module.scss";
import * as Yup from "yup";
import Button from "../../UI/button";
import InputField from "../../UI/inputField";
import {
  MAXIMUM_256_CHARACTERS_MESSAGE, NUMBER_MESSAGE,
  REQUIRED_MESSAGE,
  STRING_MESSAGE,
  VALID_NAME_MESSAGE, VALID_NUMBER_MESSAGE
} from "../../../helpers/validation-message";
import {useHistory} from "react-router-dom";
import CloseSVG from "../../iconsSVG/CloseSVG";
import EmptyImageSVG from "../../iconsSVG/EmptyImageSVG";
import SelectInput from "../../UI/selectInput";

const EditBooksForm = ({
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
  const [currentAuthorValue, setCurrentAuthorValue] = useState('')
  const [currentAuthorLabel, setCurrentAuthorLabel] = useState('')
  const history = useHistory();

  useEffect(() => {
    if (authorsOptions && authorsOptions.length) {
      let lists = authorsOptions.map(a => {

        if(values && a.id === values.author_id){
          setCurrentAuthorValue(a.id)
          setCurrentAuthorLabel(a.first_name +' '+ a.last_name)
        }

        return {
          value: a.id, label: a.first_name +' '+ a.last_name
        }
      })
      return setOptions(lists)
    }
  }, [authorsOptions, values])

  return (
    <Form name="editBooksForm" className={styles.form}>

      <div className="my-4">
        <table className="table table-bordered table-hover">
          <thead>
          <tr>
            <th scope="col" className={styles.th}>#</th>
            <th scope="col" className={styles.th}>Обложка книги</th>
            <th scope="col" className={styles.th}>Название книги</th>
            <th scope="col" className={styles.th}>Автора</th>
            <th scope="col" className={styles.th}>Первая публикаци</th>
          </tr>
          </thead>
          <tbody>
          <tr className={styles.tr}>
            <th scope="row" className={styles.th}></th>
            <td className={styles.td}>
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
            </td>
            <td className={styles.td}>
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
            </td>
            <td className={styles.td}>

              {
                currentAuthorValue && currentAuthorLabel ?
                  <SelectInput
                    options={options}
                    label='Автор'
                    defaultValue={{value: currentAuthorValue, label: currentAuthorLabel}}
                    placeholder={{value: currentAuthorValue, label: currentAuthorLabel}}
                    onChange={(event) => {
                      setFieldValue('author_id', event.value)
                    }}
                    error={(touched.author_id && errors.author_id) && errors.author_id}
                  />
                  :
                  null
              }

            </td>
            <td className={styles.td}>
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
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-end">
        <div className='ml-4'>
          <Button view={'btn-secondary'} disabled={isLoading} onClick={() => history.goBack()} >Назад</Button>
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
  mapPropsToValues({book}) {
    return {
      image: (book && book.image) || '',
      title: (book && book.title) || '',
      author_id: (book && book.author_id) || '',
      year: (book && book.year) || '',
      created_at: (book && book.created_at) || new Date(),
    };
  },
  validationSchema: Yup.object().shape({
    image: Yup.string(),
    title: Yup.string(STRING_MESSAGE)
      .min(2, VALID_NAME_MESSAGE)
      .max(256, MAXIMUM_256_CHARACTERS_MESSAGE)
      .required(REQUIRED_MESSAGE),
    author_id: Yup.string(STRING_MESSAGE)
      .required(REQUIRED_MESSAGE),
    year: Yup.string(NUMBER_MESSAGE)
      .min(4, VALID_NUMBER_MESSAGE)
      .required(REQUIRED_MESSAGE)
  }),
  handleSubmit: ({image, title, author_id, year}, {props}) => {
    props.handleSubmit(image, title, author_id, year);
  },
})(EditBooksForm);
