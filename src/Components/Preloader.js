import React, {Component} from "react";
import $ from "jquery";

export default class Preloader extends Component {
    componentDidMount() {
        setTimeout(() => {
            $('.preloader').hide();
        }, 3000)
    }

    render() {
        return (
            <div className="preloader">
                <div className="preloader-wrapper">
                    <div className="icon-preloader"></div>
                    <span className="preloader-text">Drum'n'Code</span>
                </div>
            </div>
        )
    }
}