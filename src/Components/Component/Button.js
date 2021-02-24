import React from "react";
import PropTypes from "prop-types";
const Button = ( {className, onClick, text, id} ) => {
    return(
        <button id={id} className={className} onClick={onClick}>
            {text}
        </button>
    )
}

export default Button;

Button.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    text: PropTypes.string,
    id: PropTypes.string,
}

Button.defaultProps = {
    className: "btn",
    onClick: null,
    text: "Button",
    id: "",
}