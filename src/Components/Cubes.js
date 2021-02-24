import React,{useState, useEffect} from "react";
import "./cubes.css";
import cubicGif from "../assets/cubics.gif";
import Button from "./Component/Button";
export default function Cubes(props){
    const [isCubicStart, setCubicsStart] = useState(false);
    const [status, setStatus] = useState(props.cubicStatus);
    const [cubicFull, setCubicFull] = useState(0);
    const [cubicFirst, setCubicFirst] = useState(0);
    const [cubicSecond, setCubicSecond] = useState(0);
    const [cubicStatus, setCubicStatus] = useState(false);
    const [gifPlay, setGifPlay] = useState(false);

    // useEffect(async ()=>{
    //     await generateCubics();
    // },[])
    if(gifPlay){
        setCubicFirst(randomInteger(1,7));
        setCubicSecond(randomInteger(1,7));
        setCubicFull(randomInteger(2,13));
            console.log("Generate Cub",cubicFull, cubicFirst, cubicSecond);
        setTimeout(()=>{
            if(cubicFull<=cubicFirst+cubicSecond){
                setCubicStatus(false)
            }
            else  setCubicStatus(true);
        },1000)
        setGifPlay(false);

    }
    //  function generateCubics(){
    //      setCubicFirst(randomInteger(1,7));
    //      let vartt = randomInteger(1,7);
    //      console.log("vartt", vartt);
    //      setCubicFirst(vartt);
    //      console.log('cubicFirst',cubicFirst)
    //      // console.log("ALERT", cubicFirst);
    //      setCubicSecond(randomInteger(1,7));
    //      setCubicFull(randomInteger(2,13));
    //      setGifPlay(true);
    //     console.log("Generate Cub",cubicFull, cubicFirst, cubicSecond);
    //      cubicResult();
    //
    // }
    //  function cubicResult(){
    //     console.log("CUBIC RESULT",cubicFull, cubicFirst, cubicSecond );
    //         setGifPlay(false);
    //         if(cubicFull>cubicFirst+cubicSecond){
    //               setCubicStatus(false)
    //         }
    //         else  setCubicStatus(true);
    //
    // }

    function randomInteger(min, max) {
        // случайное число от min до (max+1)
        let rand = min + Math.random() * (max - min);
        return Math.floor(rand);
    }

    return(

        <div className="cubics-wrap">
            {
                status && (
                    <div className="cubics">
                        {
                            !isCubicStart && (
                                <div className="menu-cubics">
                                    <p className="go-start">Будешь играть?</p>
                                    <div className="btn-group">
                                        <Button className="btn-cub" onClick={() => setCubicsStart(true)} text="Конечно" />
                                        <Button className="btn-cub" onClick={() => setStatus(false)} text="Нет" />
                                    </div>
                                </div>
                            )
                        }

                        {
                            isCubicStart && (
                                <div className="content-cubics">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times"
                                         className="svg-inline--fa fa-times fa-w-11" role="img"
                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                                        <path fill="currentColor"
                                              d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                                    </svg>
                                    <p className="go-start">Компьютер загадал число:</p>
                                    <p className="random-value">{cubicFull}</p>
                                    <div className="btn-group">
                                        <Button className="cubics-btn" onClick={()=>setGifPlay(true)} text="Бросить кубики" />
                                    </div>
                                    {
                                        !gifPlay ? (
                                            <div className="btn-group">
                                                <span className="cub">{cubicFirst}</span>
                                                <span className="cub">+</span>
                                                <span className="cub">{cubicSecond}</span>
                                            </div>
                                        ) : ""
                                    }
                                    {/*<div className="btn-group">*/}
                                    {/*    <span className="cub">{cubicFirst}</span>*/}
                                    {/*    <span className="cub">+</span>*/}
                                    {/*    <span className="cub">{cubicSecond}</span>*/}
                                    {/*</div>*/}
                                    {
                                        gifPlay && <img src={cubicGif} alt="gif"/>
                                    }
                                    {/*<p className='`${cubicStatus} ? 'cub cubic-status-win' : 'cub cubic-status-lose'">{cubicStatus ? "Победил" : "Проиграл"}</p>*/}
                                    {
                                        !gifPlay ?
                                            cubicStatus ? (<p className="cub cubic-status-win">Победил</p>)
                                                : (<p className="cub cubic-status-lose">Проиграл</p>)
                                            : ""
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
