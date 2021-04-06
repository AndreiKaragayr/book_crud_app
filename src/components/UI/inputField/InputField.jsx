import React from 'react';
import styles from './InputField.module.scss'

const InputField = (
  {
    label = '',
    placeholder = '',
    type = 'text',
    name = '',
    value = '',
    onChange = () => '',
    onBlur = () => '',
    readOnly = false,
    error = ''
  }) => {

  return (
    <div className={styles.root}>
      <div className={`${styles.field} ${error && error.length ? styles.error : ''}`}>

        {
          label.length ?
            <label className={styles.label}>{label}</label>
          : null
        }

        <input
          type={type}
          placeholder={placeholder}
          id={name}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          readOnly={readOnly || false}
        />
      </div>
      {error.length ? <div className={styles.errorMessage}>{error}</div> : null}
    </div>
  );
};

export default InputField
