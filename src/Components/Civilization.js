import React, {Component} from "react";
import CivilizationField from "./CivilizationField";

export default class Civilization extends Component {
    // state = {
    //     ownerField: false,
    // }

    renderFields = (arr) => {
        return arr.map((item, index) => {
            const {id, price, name} = item;
            return (
                <CivilizationField moveTurn={this.props.moveTurn} teamsInfo={this.props.teamsInfo}
                                   updateScore={this.props.updateScore} teams={this.props.teams} key={id} price={price}
                                   name={name}/>
            )
        })
    }

    render() {
        const {fieldCivilization} = this.props;
        let fields = this.renderFields(fieldCivilization);
        return (
            <div className="civilization">
                {fields}
            </div>
        )
    }
}