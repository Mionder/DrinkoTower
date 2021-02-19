import React, {Component} from "react";

export default class CivilizationField extends Component{
    state = {
     ownerField: false,
    }

    componentDidUpdate(nextProps, nextState, nextContext) {
        console.log("Update", this.state.ownerField);


    }


    async buyField(){
        const {price,teamsInfo, teams, moveTurn} = this.props;
        const {ownerField} = this.state;
            console.log(teams.team1, price);
            if(!moveTurn){
                if(teams.team1 >= price){
                    console.log('teams.team1 >= price,  !moveTurn', true, !moveTurn)
                    let backScore = {
                        team1: teams.team1,
                        team2: teams.team2,
                        turn: !moveTurn,
                        points: -price,
                    }
                    this.props.updateScore(backScore);
                    await this.setState({ownerField: true});
                    return this.state.ownerField;

                            // this.state.ownerField = true;
                }
            }
            else{
                if(teams.team2 >= price){
                    let backScore = {
                        team1: teams.team1,
                        team2: teams.team2,
                        turn: !moveTurn,
                        points: -price,
                    }
                    await this.setState({ownerField: true});
                    await this.props.updateScore(backScore);
                    // this.state.ownerField = true;
                    // await setOwnerField(true);
                }
            }
    }


    render() {
        const {teamsInfo, price, moveTurn, name, teams} = this.props;
        const {ownerField} = this.state;
        console.log('ownerFieldState', ownerField);
        return(
        <div onClick={()=>this.buyField()} className={ownerField ? `civilization-field ${teamsInfo[+(moveTurn)].color}` : `civilization-field`}>

            <p>{price}</p>
            {name}
            {+ownerField}
        </div>
        )
    }
}