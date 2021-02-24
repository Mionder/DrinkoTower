import React from "react";
import PropTypes from "prop-types";

const Input = ( {className, type, placeholder, onChange, min} ) => {
    return(
        <input className={className} type={type} placeholder={placeholder} onChange={onChange} min={min} />
    )
}
export default Input;

Input.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    min: PropTypes.string
}
Input.defaultProps = {
    className: "input",
    type: "text",
    placeholder: "",
    onChange: null,
    min: "0",
}