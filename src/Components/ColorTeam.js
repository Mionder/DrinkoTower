import React, {useState} from "react";
import "./colorTeam.css";
import $ from "jquery";
import PropTypes from "prop-types";
export default function ColorTeam(props){
    const [teamColor, setTeamColor] = useState('');
    $(document).ready(function (){
        $('.color-item').click(function (){
            $(this).parent().children('.color-item').removeClass('selected-color');
            $(this).parent().children('.color-item').children().removeClass('selected-icon');
            $(this).addClass('selected-color');
            $(this).children().addClass('selected-icon');
        })
    })

    function setColor(currColor){
        let color = {
            team: {
                color: currColor,
                index: props.id
            }
        }
        props.updateColor(color);
    }
    return(
        <div className="team-color">
            <div className="color-item red" onClick={()=>setColor("red")}>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                     className="svg-inline--fa fa-check fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 512 512">
                    <path fill="currentColor"
                          d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                </svg>
            </div>
            <div className="color-item white" onClick={()=>setColor("white")}>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                     className="svg-inline--fa fa-check fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 512 512">
                    <path fill="currentColor"
                          d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                </svg>
            </div>
            <div className="color-item black" onClick={()=>setColor("black")}>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                     className="svg-inline--fa fa-check fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 512 512">
                    <path fill="currentColor"
                          d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                </svg>
            </div>
            <div className="color-item yellow" onClick={()=>setColor("yellow")}>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                     className="svg-inline--fa fa-check fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 512 512">
                    <path fill="currentColor"
                          d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                </svg>
            </div>
        </div>
    )
}

ColorTeam.propTypes = {
    updateColor: PropTypes.func,
    id: PropTypes.number,
};