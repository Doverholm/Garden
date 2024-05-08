import React, { useEffect, useState } from 'react';

import soundManager from './utils/soundManager.js';

import MainMenu from './components/MainMenu/MainMenu.js';
import CharacterMenu from './components/MainMenu/CharacterMenu/CharacterMenu.js';
import OptionsMenu from './components/MainMenu/OptionsMenu/OptionsMenu.js';
import ConfigButtons from './components/ConfigButtons/ConfigButtons.js';
import GameScreen from './components/GameScreen/GameScreen.js';

import './styles/App.css';

const App = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [showCharacter, setShowCharacter] = useState(false);
  const [showGameScreen, setShowGameScreen] = useState(false);

  const displayMenu = () => {
      setShowCharacter(false);
      setShowOptions(false);
      setShowGameScreen(false);

      setShowMenu(true);
  }

  const displayOptions = () => {
      setShowMenu(false);
      setShowCharacter(false);
      setShowGameScreen(false);

      setShowOptions(true);
  }

  const displayCharacter = () => {
      setShowMenu(false);
      setShowOptions(false);
      setShowGameScreen(false);

      setShowCharacter(true);
  }

  const displayGameScreen = () => {
    setShowMenu(false);
    setShowOptions(false);
    setShowCharacter(false);

    setShowGameScreen(true);
  }

  useEffect(() => {
    soundManager.init();
    //soundManager.playMenuMusic();
  });

  return (
    <div id='app' className='app'>

      { showMenu && <MainMenu displayGameScreen={displayGameScreen} displayOptions={displayOptions} displayCharacter={displayCharacter} /> }
      { showCharacter && <CharacterMenu displayMenu={displayMenu} /> }
      { showOptions && <OptionsMenu displayMenu={displayMenu} /> }
      {showGameScreen && <GameScreen />}
      <ConfigButtons />

    </div>
  );
}
export default App;