import React, {useState} from "react";
import "./colorTeam.css";
import $ from "jquery";
import PropTypes from "prop-types";
import ColorItem from "./ColorItem";
export default function ColorTeam(props){
    const [teamColor, setTeamColor] = useState('');
    const [colors, setColors] = useState(["red" , "white", "black", "yellow", "green"]);
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
            {colors.map((color, key) => (
                <ColorItem key={key} className={`color-item ${color}`} onClick={()=>setColor(color)} />
            ))}
        </div>
    )
}

ColorTeam.propTypes = {
    updateColor: PropTypes.func,
    id: PropTypes.number,
};

ColorTeam.defaultProps = {
    updateColor: null,
}