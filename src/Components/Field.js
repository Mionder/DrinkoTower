import React, {useState} from "react";
import Beer from "../assets/beer.png";
import Vodka from "../assets/vodka.png";
import Eger from "../assets/eger.png";
import Konyak from "../assets/konyak.png";
import $ from "jquery";
import Cubic from "./Cubics";
import PropTypes from "prop-types";
import Button from "./Component/Button";
import Image from "./Component/Image";

export default function Field(props) {
    const [status, setStatus] = useState(props.status)
    const [isCubics, setIsCubics] = useState(false);
    const [points, setPoints] = useState(props.points);
    // const [currentPoint, setCurrentPoint] = useState(0);
    const [isCardActive, setCardActive] = useState(false);


    async function cardActive() {
        if (!status) {
            if (props.name === "Кубики") {
                await setTimeout(() => {
                    setIsCubics(true);
                }, 1000)
                // return <Cubes cubicStatus={true} />
            } else {
                await setTimeout(async () => {
                    await setCardActive(true);
                }, 1000)
            }
        }
        setStatus(true);
    }

    function drinkRequest(status) {
        let currPoint = 0;
        points.forEach((item) => {
            if (item.name === props.name) {
                currPoint = item.points;
            }
        })
        if (!status) {
            currPoint = -currPoint;
        }
        let backScore = {
            team1: props.teams.team1,
            team2: props.teams.team2,
            turn: !props.moveTurn,
            points: currPoint,
        }
        setCardActive(false);
        props.updateScore(backScore);
    }

    return (
        <div className="field field-content" onClick={cardActive}>
            {
                status &&
                <div className="field-content">

                    {props.name === "пиво" ? (
                        <Image className="field-img" img={Beer} alt="beer"/>
                    ) : props.name === "водка" ? <Image className="field-img" img={Vodka} alt="vodka"/> : (
                        <span>{props.name}</span>
                    )
                    }
                </div>
            }
            {
                isCardActive &&
                <div className="modal-field">
                    <p className="label-modal">Будешь пить {props.name}?</p>
                    <div className="btn-group">
                        <Button onClick={() => drinkRequest(true)} className="btn-cub" text="Конечно" />
                        <Button onClick={() => drinkRequest(false)} className="btn-cub" text="Ноу" />
                    </div>
                </div>
            }

            {
                isCubics &&
                <Cubic
                    updateScore={props.updateScore}
                    cubicStatus={isCubics}
                    teams={props.teams}
                    moveTurn={props.moveTurn}
                />

            }
        </div>
    )
}

Field.propTypes = {
  status: PropTypes.bool,
  points: PropTypes.array,
  updateScore: PropTypes.func,
  moveTurn: PropTypes.bool,
  teams: PropTypes.array,
  name: PropTypes.string,
};