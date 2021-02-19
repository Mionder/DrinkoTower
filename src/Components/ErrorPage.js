import React, {Component} from "react";
import {Link} from "react-router-dom";
export default class ErrorPage extends Component{
    render() {
        return(
            <div className="error-page">
                page not found
               <Link to="/"><button>На стартовую страницу</button></Link>
            </div>
        )
    }
}