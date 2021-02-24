// import React, {useState} from "react";
// import PropTypes from "prop-types";
// import Button from "../Components/Component/Button";
// const Teams = ( {inputs} ) => {
//     const [teamsInfo, setTeamsInfo] = useState( [
//         {
//             color: '',
//             name: '',
//             id: Math.random().toString(),
//         },
//         {
//             color: '',
//             name: '',
//             id: Math.random().toString(),
//         },
//     ])
//     const [validateInfo, setValidateInfo] = useState("");
//
//     const validateTeam = () => {
//         // const {teamsInfo} = this.state;
//         let namesValidate = teamsInfo.every(item => item.name !== "");
//         let colorValidate = teamsInfo.every(item => item.color !== "");
//
//         if ((namesValidate && colorValidate) && (teamsInfo[0].name !== teamsInfo[1].name && teamsInfo[0].color !== teamsInfo[1].color)) {
//             // this.setState({currentStage: "Drinks", validateInfo: ""});
//         } else {
//             // this.setState({validateInfo: "Введите всю информацию"})
//             setValidateInfo("Введите всю информацию");
//         }
//     }
//
//     return(
//         <div className="team-info">
//             {
//                 validateInfo !== "" && <p className="validate-info">{validateInfo}</p>
//             }
//             {inputs}
//             <Button className="btn" onClick={() => validateTeam()} text="Далее" />
//         </div>
//     )
// }
//
// export default Teams;
//
// Teams.propTypes = {
//
// }
// Teams.defaultProps = {
//
// }