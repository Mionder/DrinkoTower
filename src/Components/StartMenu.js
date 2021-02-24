import React, {Component} from "react";
import Field from "./Field";
import ColorTeam from "./ColorTeam";
import Header from "./Header";
import Input from "./Component/Input";
import Button from "./Component/Button";

export default class StartMenu extends Component {
    state = {
        drinks: [
            {
                amount: 0,
                name: "",
                id: Math.random().toString(),
                points: 0,
            },
        ],
        amountFields: 0,
        drinksName: [],
        fields: [],
        currField: true,
        maxAmountDrinks: 24,
        isReadyFields: false,
        teams: {
            team1: 0,
            team2: 0,
        },
        teamsInfo: [
            {
                color: '',
                name: '',
                id: Math.random().toString(),
            },
            {
                color: '',
                name: '',
                id: Math.random().toString(),
            },
        ],
        moveTurn: false,
        fieldCivilization: [],
        currentStage: "Name&Colors",
        validateInfo: "",
    }

    componentDidMount() {
        for (let i = 0; i < 10; i++) {
            this.state.fieldCivilization.push(
                {
                    id: Math.random().toString(),
                    price: 10,
                    name: "Шахта",
                    ownerField: Math.random().toString(),
                }
            )
            this.state.fieldCivilization.push(
                {
                    id: Math.random().toString(),
                    price: 5,
                    name: "Поле",
                    ownerField: Math.random().toString(),
                }
            )
        }
    }

    async buyField(index, priceField) {
        const {teams, moveTurn, fieldCivilization} = this.state;
        console.log(teams.team1, priceField);
        if (!moveTurn) {
            if (teams.team1 >= priceField && fieldCivilization[index].ownerField !== "team2") {
                let backScore = {
                    team1: teams.team1,
                    team2: teams.team2,
                    turn: !moveTurn,
                    points: -priceField,
                }
                await this.updateScore(backScore);
                fieldCivilization[index].ownerField = "team1";
                this.setState({})
            } else if (teams.team1 < priceField) {
                this.setState({moveTurn: !moveTurn})
            }
        } else {
            if (teams.team2 >= priceField && fieldCivilization[index].ownerField !== "team1") {
                let backScore = {
                    team1: teams.team1,
                    team2: teams.team2,
                    turn: !moveTurn,
                    points: -priceField,
                }
                fieldCivilization[index].ownerField = "team2";
                this.setState({})
                await this.updateScore(backScore);
            } else if (teams.team2 < priceField) {
                this.setState({moveTurn: !moveTurn})
            }
        }
    }

    renderFieldCiva = (arr) => {
        const {teamsInfo} = this.state;
        return arr.map((item, index) => {
            const {id, price, name, ownerField} = item;
            return (
                <div key={id} onClick={() => this.buyField(index, price)}
                     className={(ownerField === 'team1') ? `civilization-field ${teamsInfo[0].color}` : (ownerField === 'team2') ? `civilization-field ${teamsInfo[1].color}` : `civilization-field`}>
                    <p className="price-civa">{price} очков</p>
                    <p className="name-civa">{name}</p>
                </div>
            )
        })
    }


    updateScore = async (value) => {
        await this.setState({moveTurn: value.turn})
        if (this.state.moveTurn) {
            await this.setState({
                teams: {
                    team1: value.team1 + value.points,
                    team2: value.team2
                }
            })
        } else {
            await this.setState({
                teams: {
                    team1: value.team1,
                    team2: value.team2 + value.points
                }
            })
        }
    }
    deleteInput = async (id) => {
        if (this.state.drinks.length > 1) {
            let array = this.state.drinks.filter((item) => item.id !== id);
            await this.setState({drinks: array})
        }
    }

    renderTeamInfo(arr) {
        const {teamsInfo} = this.state;
        return arr.map((item, index) => {
            return (
                <div className="team-info-wrapper">
                    <Input className="input-team-name" type="text"
                           onChange={(e) => teamsInfo[index].name = e.target.value}
                           placeholder={`Название команды ${index + 1}`}/>
                    <ColorTeam updateColor={this.updateColor} id={index}/>
                </div>
            )
        })
    }

    updateColor = async (value) => {
        this.state.teamsInfo[value.team.index].color = value.team.color;
    }

    renderInputs(arr) {
        const {drinks} = this.state;
        return arr.map((item, index) => {
            return (
                <div key={index} className="item-menu">
                    <Input className="item-menu-input" type="text" onChange={(e) => drinks[index].name = e.target.value}
                           placeholder="Название алкоголя"/>
                    <Input className="item-menu-input input-num" min="0"
                           onChange={(e) => drinks[index].amount = +e.target.value} placeholder="Кол-во" type="number"/>
                    <Input className="item-menu-input input-num" min="0"
                           onChange={(e) => drinks[index].points = +e.target.value} placeholder="Балы" type="number"/>
                    <Button
                        className="delete-btn"
                        onClick={() => this.deleteInput(item.id)}
                        text={
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ban"
                                 className="svg-inline--fa fa-ban fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 512 512">
                                <path fill="currentColor"
                                      d="M256 8C119.034 8 8 119.033 8 256s111.034 248 248 248 248-111.034 248-248S392.967 8 256 8zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676zM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676z"></path>
                            </svg>
                        }
                    />

                </div>
            )
        })
    }

    addMore = () => {
        this.setState(prevState => {
            return {
                drinks: prevState.drinks.concat({amount: 0, name: "", id: Math.random().toString(), points: 0})
            };
        })
    }

    gameStart = async () => {
        await this.countAmountFields(this.state.drinks);
        await this.renderDashboard();
        this.setState({isReadyFields: true})
    }

    renderFields = (arr) => {
        return arr.map((item, index) => {
            return (
                <Field
                    moveTurn={this.state.moveTurn}
                    updateScore={this.updateScore}
                    teams={this.state.teams}
                    status={false}
                    name={item}
                    key={index}
                    points={this.state.drinks}
                />
            )
        })
    }

    countAmountFields = (arr) => {
        this.setState({amountFields: 0})
        this.setState({drinksName: []})
        return arr.forEach(async (item) => {
            if ((item.amount < 0 || typeof item.amount === "string") || (item.points < 0 || typeof item.points === "string")) {
                this.setState({validateInfo: "Введите значения > 0"})
            } else {
                await this.setState(prev => {
                    return {
                        amountFields: prev.amountFields += item.amount
                    }
                })
                let curr = +item.amount;
                while (curr !== 0) {
                    this.setState(prevState => {
                        return {
                            drinksName: prevState.drinksName.concat(item.name)
                        };
                    })
                    curr--;
                }
            }
        })
    }
    deleteDrinkNames = (arr, indexEl) => {
        arr.splice(indexEl, 1);
    }
    renderDashboard = async () => {
        let {amountFields, maxAmountDrinks, drinksName} = this.state;
        await this.setState({fields: []});
        this.setState({validateInfo: ""});

        if (maxAmountDrinks < amountFields) {
            this.setState({validateInfo: "Введите большее максимальное значение напитков"});
        } else {
            while (amountFields !== +maxAmountDrinks) {
                drinksName.push("Кубики");
                amountFields++;
            }
            for (let i = 0; i < amountFields; i++) {
                var randIndex = this.randomInteger(0, drinksName.length);
                await this.setState(prev => {
                    return {
                        fields: prev.fields.concat(drinksName[randIndex])
                    }
                })
                await this.deleteDrinkNames(this.state.drinksName, randIndex);
            }
        }
    }
    randomInteger = (min, max) => {
        // случайное число от min до (max+1)
        let rand = min + Math.random() * (max - min);
        return Math.floor(rand);
    }

    validateTeam = () => {
        const {teamsInfo} = this.state;
        let namesValidate = teamsInfo.every(item => item.name !== "");
        let colorValidate = teamsInfo.every(item => item.color !== "");

        if ((namesValidate && colorValidate) && (teamsInfo[0].name !== teamsInfo[1].name && teamsInfo[0].color !== teamsInfo[1].color)) {
            this.setState({currentStage: "Drinks", validateInfo: ""});
        } else if (!namesValidate || !colorValidate) {
            this.setState({validateInfo: "Введите всю информацию"})
        } else if (teamsInfo[0].name === teamsInfo[1].name || teamsInfo[0].color === teamsInfo[1].color) {
            this.setState({validateInfo: "Имена команд и цвета не должны совпадать"})
        }
    }

    validateStart = async () => {
        if (this.state.validateInfo === "") {
            await this.gameStart();
        }
        await this.gameStart();
        if (this.state.validateInfo === "") {
            this.setState({currentStage: "Game"})
        }
    }


    render() {
        const {drinks, validateInfo, currentStage, fieldCivilization, moveTurn, teamsInfo, teams, fields} = this.state;
        let inputs = this.renderInputs(drinks);
        let teamInputs = this.renderTeamInfo(teamsInfo);
        let civaInputs = this.renderFieldCiva(fieldCivilization);
        return (
            <div className="start-menu">
                <Header/>
                {
                    validateInfo !== "" && <p className="validate-info">{validateInfo}</p>
                }
                {currentStage === "Name&Colors" ?
                    <div className="team-info">
                        {teamInputs}
                        <Button className="btn" onClick={() => this.validateTeam()} text="Далее"/>
                    </div>
                    : currentStage === "Drinks" ?
                        <div>
                            <Input type="number" className="item-menu-input w-100"
                                   placeholder="Общее количество напитков"
                                   onChange={(e) => this.setState({maxAmountDrinks: e.target.value})}/>
                            {inputs}
                            <Button onClick={this.addMore} className="btn" text="Добавить еще"/>
                            {/*<Button onClick={this.gameStart} className="btn" />Сгенерировать поле*/}
                            <Button className="btn" onClick={() => this.validateStart()} text="Далее"/>

                        </div> : currentStage === "Game" ?
                            <div className="game">
                                <p className="title">{teamsInfo[0].name} {teams.team1} vs {teams.team2} {teamsInfo[1].name}</p>
                                <p className="title fz-32">Ход: {teamsInfo[+moveTurn].name}</p>
                                <div className="dashboard">
                                    {this.renderFields(fields)}
                                </div>
                                <Button className="btn" onClick={() => this.setState({currentStage: "Civa"})}
                                        text="Закончить раунд"/>
                            </div> :
                            currentStage === "Civa" ?
                                <div className="civilization-wrapper">
                                    <p className="title">{teamsInfo[0].name} {teams.team1} vs {teams.team2} {teamsInfo[1].name}</p>
                                    <p className="title fz-32">Ход: {teamsInfo[+moveTurn].name}</p>
                                    <div className="civilization">
                                        {civaInputs}
                                    </div>

                                    <Button
                                        className="btn"
                                        onClick={() => this.setState({currentStage: "Drinks"})}
                                        text="Назад"
                                    />

                                    <Button
                                        className="btn"
                                        onClick={() => window.location.reload()} text="Начать заново"
                                    />
                                </div> : ""
                }
            </div>
        )
    }
}