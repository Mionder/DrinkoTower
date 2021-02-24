import React, {Component} from "react";
import {Link} from "react-router-dom";
import Button from "./Component/Button";
export default class ErrorPage extends Component{
    render() {
        return(
            <div className="error-page">
                page not found
               <Link to="/"><Button text="На стартовую страницу" /></Link>
            </div>
        )
    }
}