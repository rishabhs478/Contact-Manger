import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextInputGroup=({
    label,
    name,
    value,
    placeholder,
    type,
    onChange,
    error
})=> {
  return(
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        className={classnames("form-control from-control-lg", {
          "is-invalid": error,
        })}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
    />
     {error && <div className="invalid-feedback">{error}</div>}
     
    <div className='invalid-feedback'></div>
</div>
  );
};
TextInputGroup.propTypes={
    name:PropTypes.string.isRequired,
    placeholder:PropTypes.string.isRequired,
    value:PropTypes.string.isRequired,
    type:PropTypes.string.isRequired,
    onchange:PropTypes.func.isRequired,
    label:PropTypes.string.isRequired,
    error:PropTypes.string
}
TextInputGroup.defaultProps={
    type:'text'
}

export default TextInputGroup;