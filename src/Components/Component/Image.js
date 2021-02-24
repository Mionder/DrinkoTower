import React from "react";
import PropTypes from "prop-types";
const Image = ({img, className, alt}) => {
    return(
        <img src={img} alt={alt} className={className}/>
    )
}

export default Image;

Image.propTypes = {
    img: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
}

Image.defaultProps = {
    img: "",
    alt: "img-photo",
    className: "",
}