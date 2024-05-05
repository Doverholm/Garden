import React, { useState } from "react";
import soundManager from "../../../utils/soundManager";

import './CharacterMenu.css';

import bodyMale from '../../../assets/images/character/body-male.png';
import bodySkeleton from '../../../assets/images/character/body-skeleton.png';

import headEmpty from '../../../assets/images/character/heads/head-empty.png';
import headHair from '../../../assets/images/character/heads/head-hair.png';
import headLeather from '../../../assets/images/character/heads/head-leather.png';
import headChain from '../../../assets/images/character/heads/head-chain.png';
import headChainHood from '../../../assets/images/character/heads/head-chain-hood.png';
import headPlate from '../../../assets/images/character/heads/head-plate.png';
import headRobe from '../../../assets/images/character/heads/head-robe.png';

import chestEmpty from '../../../assets/images/character/chest/chest-empty.png';
import chestShirt from '../../../assets/images/character/chest/chest-shirt.png';
import chestLeather from '../../../assets/images/character/chest/chest-leather.png';
import chestChain from '../../../assets/images/character/chest/chest-chain.png';
import chestPlate from '../../../assets/images/character/chest/chest-plate.png';
import chestRobe from '../../../assets/images/character/chest/chest-robe.png';

import legsEmpty from '../../../assets/images/character/legs/legs-empty.png';
import legsPants from '../../../assets/images/character/legs/legs-pants.png';
import legsPlate from '../../../assets/images/character/legs/legs-plate.png';
import legsRobe from '../../../assets/images/character/legs/legs-robe.png';

import feetEmpthy from '../../../assets/images/character/feet/feet-empty.png';
import feetLeather from '../../../assets/images/character/feet/feet-leather.png';
import feetPlate from '../../../assets/images/character/feet/feet-plate.png';

const CharacterMenu = ({displayMenu}) => {

    const toMenu = () => {
        displayMenu();
    }
    const clickSound = () => {
        soundManager.playClick();
    }
    const hoverSound = () => {
        soundManager.playHover();
    }

    const [bodies] = useState([bodyMale, bodySkeleton]);
    const [bodyNumber, setBodyNumber] = useState(0);

    const [heads] = useState([headEmpty, headHair, headLeather, headChain, headChainHood, headPlate, headRobe]);
    const [headNumber, setHeadNumber] = useState(0);

    const [chests] = useState([chestEmpty, chestShirt, chestLeather, chestChain, chestPlate, chestRobe]);
    const [chestNumber, setChestNumber] = useState(0);

    const [legs] = useState([legsEmpty, legsPants, legsPlate, legsRobe]);
    const [legsNumber, setLegsNumber] = useState (0);

    const [feet] = useState([feetEmpthy, feetLeather, feetPlate]);
    const [feetNumber, setFeetNumber] = useState(0);

    const changeSprite = (direction, array, arrayNumber, setArrayNumber) => {
        if (direction === 'right') {
            if (arrayNumber === array.length - 1 ) {
                setArrayNumber(0);
            } else {
                setArrayNumber(arrayNumber + 1);
            }
        } else if (direction === 'left') {
            if (arrayNumber === 0) {
                setArrayNumber(array.length - 1);
            } else {
                setArrayNumber(arrayNumber - 1);
            }
        }
    }

    return (
        <div className="character-menu">

            <div className="title-container">
                <p>Character</p>
            </div>

            <div className="textfield-1-container">
                <div className="background-container">
                    <input onMouseEnter={hoverSound} onClick={clickSound} type="text" placeholder="Name..." maxLength="15" spellCheck="false"></input>
                </div>
            </div>
            <div className="textfield-2-container">
                <div className="background-container">
                    <input onMouseEnter={hoverSound} onClick={clickSound} type="text" placeholder="Specialty..." maxLength="15" spellCheck="false"></input>
                </div>
            </div>

            <div className="back-container">
                <button onMouseEnter={hoverSound} onClick={() => {clickSound(); toMenu();}}></button>
            </div>

            <div className="caracter-window-container">
                <div className="character-container">
                    <div style={{ backgroundImage: `url(${bodies[bodyNumber]})` }} className="body"></div>

                    <div style={{ backgroundImage: `url(${heads[headNumber]})` }} className="head"></div>
                    <div style={{ backgroundImage: `url(${chests[chestNumber]})` }} className="chest"></div>
                    <div style={{ backgroundImage: `url(${legs[legsNumber]})` }} className="legs"></div>
                    <div style={{ backgroundImage: `url(${feet[feetNumber]})` }} className="feet"></div>
                </div>
                <div className="buttons-container">
                    <div><button onMouseEnter={hoverSound} onClick={() => {clickSound(); changeSprite('left', heads, headNumber, setHeadNumber);}} ></button></div>
                    <div><button onMouseEnter={hoverSound} onClick={() => {clickSound(); changeSprite('left', chests, chestNumber, setChestNumber);}} ></button></div>
                    <div><button onMouseEnter={hoverSound} onClick={() => {clickSound(); changeSprite('left', legs, legsNumber, setLegsNumber);}} ></button></div>
                    <div><button onMouseEnter={hoverSound} onClick={() => {clickSound(); changeSprite('left', feet, feetNumber, setFeetNumber);}} ></button></div>

                    <div><button onMouseEnter={hoverSound} onClick={() => {clickSound(); changeSprite('right', heads, headNumber, setHeadNumber);}} ></button></div>
                    <div><button onMouseEnter={hoverSound} onClick={() => {clickSound(); changeSprite('right', chests, chestNumber, setChestNumber);}} ></button></div>
                    <div><button onMouseEnter={hoverSound} onClick={() => {clickSound(); changeSprite('right', legs, legsNumber, setLegsNumber);}} ></button></div>
                    <div><button onMouseEnter={hoverSound} onClick={() => {clickSound(); changeSprite('right', feet, feetNumber, setFeetNumber); console.log(feet)}} ></button></div>

                    <div><button onMouseEnter={hoverSound} onClick={() => {clickSound(); changeSprite('left', bodies, bodyNumber, setBodyNumber);}} ></button></div>
                    <div><button onMouseEnter={hoverSound} onClick={() => {clickSound(); changeSprite('right', bodies, bodyNumber, setBodyNumber);}} ></button></div>
                </div>
            </div>

            <div className="confirm-container">
                <button onMouseEnter={hoverSound} onClick={clickSound} ></button>
            </div>

        </div>
    );
}
export default CharacterMenu;