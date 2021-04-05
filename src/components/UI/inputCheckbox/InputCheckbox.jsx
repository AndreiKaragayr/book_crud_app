import React from 'react';
import styles from './InputCheckbox.module.scss';

const InputCheckbox = (
  {
    label = '',
    name = '',
    checked = false,
    onChange = () => '',
    onBlur = () => '',
    readOnly=false,
    error = ''
  }) => {

  return (
    <div className={`${styles.root} ${error.length ? styles.error : ''}`}>
      <input
        id={name}
        className={styles.checkbox}
        type="checkbox"
        name={name}
        onBlur={onBlur}
        checked={checked}
        onChange={onChange}
      />

      {
        label.length ?
          <label htmlFor={name} className={`${styles.label} ${readOnly ? styles.readOnlyCheck : ''}`}>
            <span>{label}</span>
          </label>
          : null
      }

      {error.length ? <span className={styles.errorMessage}>{error}</span> : null}
    </div>
  );
};

export default InputCheckbox;
