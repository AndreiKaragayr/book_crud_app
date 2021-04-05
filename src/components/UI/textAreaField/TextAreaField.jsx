import React from 'react';
import styles from './TextAreaField.module.scss'

const TextAreaField = (
  {
    label = '',
    placeholder = '',
    name = '',
    value = '',
    onChange = () => '',
    onBlur = () => '',
    height= '',
    readOnly=false,
    error = ''
  }) => {

  return (
    <div className={`${styles.root} ${readOnly ? styles.readOnly : ''} `}>
      <div className={`${styles.field} ${error.length ? styles.error : ''}`}>
        {label.length ? <label className={styles.label}>{label}</label> : null}
        <textarea
          placeholder={placeholder}
          id={name}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          style={{height: height || 'auto'}}
        />
      </div>
      {error.length ? <div className={styles.errorMessage}>{error}</div> : null}
    </div>
  );
};

export default TextAreaField
