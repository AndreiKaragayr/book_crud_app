import React, {useEffect} from 'react';
import './styles.scss';
import DatePicker from 'react-date-picker';

const InputDatePicker = ({
                           label = 'date',
                           value = '',
                           onChange,
                           maxDate = null,
                           minDate = null,
                           error = '',
                           readOnly = false,
                           format = "y-MM-dd",
                         }) => {
  useEffect(() => {

  })

  return (
    <div className={`${readOnly ? 'datePicker-root readOnly' : 'datePicker-root'}`}>
      <div className={`datePicker-field ${error.length ? 'datePicker-field--error' : ''}`}>
        <div className="datePicker-field-label">{label}</div>

        <DatePicker
          format={format}
          minDate={minDate}
          maxDate={maxDate}
          locale="en-EN"
          onChange={e => onChange(e)}
          value={value}
          showLeadingZeros={true}
          closeCalendar={true}
        />
      </div>
      {error.length ? <div className="datePicker-field-errorMessage">{error}</div> : null}
    </div>
  );
};

export default InputDatePicker