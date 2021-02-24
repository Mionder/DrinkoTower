import React, {Component} from "react";
import cubicGif from "../assets/cubics.gif";
import "./cubes.css";
import $ from "jquery";
import PropTypes from "prop-types";
import Button from "./Component/Button";
import Image from "./Component/Image";

export default class Cubic extends Component {
    state = {
        isCubicStart: false,
        status: this.props.cubicStatus,
        cubicValue: {
            first: 0,
            second: 0,
            full: 0,
        },
        cubicStatus: false,
        gifPlay: false,
    }

    generateCubics = async () => {
        await this.setState({
            cubicValue: {
                first: this.randomInteger(1, 7),
                second: this.randomInteger(1, 7),
                full: this.randomInteger(2, 13)
            }
        })
        await this.setState({gifPlay: true})
        await this.cubicResult();

    }
    cubicResult = async () => {
        const {cubicValue} = this.state;
        this.setState({gifPlay: false});
        let cubPoint = 1;
        if (cubicValue.full <= cubicValue.first + cubicValue.second) {
            await this.setState({cubicStatus: true});
        } else {
            await this.setState({cubicStatus: false});
            cubPoint = -cubPoint;
        }
        let backScore = {
            team1: this.props.teams.team1,
            team2: this.props.teams.team2,
            turn: !this.props.moveTurn,
            points: cubPoint,
        }
        this.props.updateScore(backScore);
        $('#throw-cub').attr('disabled', true);
        await setTimeout(async () => {
            await this.setState({status: false})
        }, 2500)
    }

    randomInteger(min, max) {
        let rand = min + Math.random() * (max - min);
        return Math.floor(rand);
    }

    falseGame() {
        this.setState({status: false})
        let backScore = {
            team1: this.props.teams.team1,
            team2: this.props.teams.team2,
            turn: !this.props.moveTurn,
            points: 0,
        }
        this.props.updateScore(backScore);
    }


    render() {
        const {isCubicStart, status, cubicValue, cubicStatus, gifPlay} = this.state;
        return (
            <div className={status ? "cubics-wrap" : "d-n"}>
                {
                    status && (
                        <div className="cubics">
                            {
                                !isCubicStart && (
                                    <div className="menu-cubics">
                                        <p className="go-start">Будешь играть в кубики?</p>
                                        <div className="btn-group">
                                            <Button
                                                className="btn-cub"
                                                onClick={() => this.setState({isCubicStart: true})}
                                                text="Конечно"
                                            />
                                            <Button
                                                className="btn-cub"
                                                onClick={() => this.falseGame()}
                                                text="Нет"
                                            />
                                        </div>
                                    </div>
                                )
                            }

                            {
                                isCubicStart && (
                                    <div className="content-cubics">
                                        <svg onClick={() => this.setState({status: false})} aria-hidden="true"
                                             focusable="false" data-prefix="fas" data-icon="times"
                                             className="svg-inline--fa fa-times fa-w-11" role="img"
                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                                            <path fill="currentColor"
                                                  d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                                        </svg>
                                        <p className="go-start">Компьютер загадал число:</p>
                                        <p className="random-value">{cubicValue.full}</p>
                                        <div className="btn-group">
                                            <Button
                                                id="throw-cub"
                                                className="cubics-btn"
                                                onClick={this.generateCubics}
                                                text="Бросить кубики"
                                            />
                                        </div>
                                        {
                                            !gifPlay ? (
                                                <div className="btn-group">
                                                    <span className="cub">{cubicValue.first}</span>
                                                    <span className="cub">+</span>
                                                    <span className="cub">{cubicValue.second}</span>
                                                </div>
                                            ) : ""
                                        }

                                        {
                                            gifPlay && <Image img={cubicGif} alt="gif"/>
                                        }

                                        {
                                            cubicValue.full !== 0 && (
                                                cubicStatus ? <p className="cub cubic-status-win">Победил</p> :
                                                    <p className="cub cubic-status-lose">Проиграл</p>
                                            )
                                        }
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        )
    }
}

Cubic.propTypes = {
    updateScore: PropTypes.func,
    cubicStatus: PropTypes.bool,
    teams: PropTypes.array,
    moveTurn: PropTypes.bool,
};

Cubic.defaultProps = {
    updateScore: null,
    cubicStatus: false,
    teams: [],
}