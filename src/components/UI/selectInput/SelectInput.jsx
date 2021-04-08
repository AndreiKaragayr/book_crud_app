import React from 'react';
import styles from './SelectInput.module.scss'
import Select from "react-select";

const SelectInput = (
  {
    options = [],
    label = '',
    defaultValue = null,
    onChange = () => '',
    readOnly=false,
    error = []
  }) => {
  return (
    <div className={`${styles.root} ${error.length ? styles.error : ''}`}>
      <div className={styles.field}>
        {label ? <label className={styles.label}>{label}</label> : null}
        <Select
          className='react-custom-select'
          defaultValue={defaultValue || options[0]}
          options={options}
          onChange={(value) => onChange(value)}
          styles={{
            option: (provided, state) => ({
              ...provided,

              color: state.isSelected ? '#212121' : '#212121',
              background: state.isSelected ? '#d3d8fa' : '#fff',
              padding: 15,
              cursor: 'pointer',
              fontFamily: 'Roboto-Regular',
              fontSize: '16px',
              lineHeight: '20px',
            }),
            control: () => ({
              border: `1px solid ${error.length ? "#e93c5c": "#cdcdcd"}`,
              height: '64px',
              width: '100%',
              display: 'flex',
              borderRadius: '12px',
              background: readOnly ? 'rgba(211, 216, 250, 0.5) ' : '#fff',
              pointerEvents: readOnly ? 'none' : 'auto',
            }),
            valueContainer: () => ({
              width: '100%',
              minWidth: '120px',
              paddingLeft: '20px',
              paddingRight: '0',
              paddingBottom: '15px',
              paddingTop: '15px',
              position: 'relative'
            }),
            placeholder: (provided, state) => {
              return {
                ...provided,
                marginTop: '9px',
                marginLeft: '0',
                marginRight: '0',
                color: 'rgba(21, 21, 21, 0.5)',
                fontFamily: 'Roboto-Regular',
                fontSize: '16px',
                lineHeight: '24px',
                fontWeight: 300,
                letterSpacing: 0
              };
            },
            singleValue: (provided, state) => {
              const opacity = state.isDisabled ? 0.5 : 1;
              const transition = 'opacity 300ms';
              return {
                ...provided,
                opacity,
                transition,
                marginTop: '9px',
                marginLeft: '0',
                marginRight: '0',
                color: 'rgb(55, 60, 83)',
                fontFamily: 'Roboto-Regular',
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: 300,
                letterSpacing: 0
              };
            },
            input: () => ({
              marginTop: '-5px',
              marginLeft: '0',
              marginRight: '0',
              color: '#212121',
              fontFamily: 'Roboto-Regular',
              fontSize: '16px',
              lineHeight: '24px',
              fontWeight: 300,
              letterSpacing: 0,
              position: 'absolute',
              top: '50%'
            }),
            indicatorSeparator: () => ({
              border: '0',
            }),
            indicatorsContainer: () => ({
              background: '#fff',
              color: '#fff',
              borderRadius: '6px',
              height: '24px',
              width: '24px',
              marginRight: '15px',
              padding: '0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '24px',
              marginLeft: '10px'
            }),
            menuList: (provided, state) => {
              return {
                ...provided,
                marginTop: 0,
                marginBottom: 0,
                paddingTop: 0,
                paddingBottom: 0
              };
            },
          }}
        />
      </div>
      {error.length ? <div className={styles.errorMessage}>{error}</div> : null}
    </div>
  );
};

export default SelectInput
