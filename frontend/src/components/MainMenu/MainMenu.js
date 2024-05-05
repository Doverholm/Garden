import React from 'react';

import PlayButton from './Buttons/PlayButton';
import OptionsButton from './Buttons/OptionsButton';
import LoginButton from './Buttons/LoginButton';

import '../MainMenu/MainMenu.css';

const MainMenu = ({ displayOptions, displayCharacter }) => {

    return (
        <div className="mainMenu">
            <h1>Garden</h1>
            <div className='selection'>
                <div>
                    <PlayButton displayCharacter={displayCharacter} />
                </div>
                <div>
                    <OptionsButton displayOptions={displayOptions} />
                </div>
                <div>
                    <LoginButton />
                </div>
            </div>
        </div>
    );
}
export default MainMenu;