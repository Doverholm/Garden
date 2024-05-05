import React, { useEffect, useState } from 'react';

import soundManager from './utils/soundManager.js';

import MainMenu from './components/MainMenu/MainMenu.js';
import CharacterMenu from './components/MainMenu/CharacterMenu/CharacterMenu.js';
import OptionsMenu from './components/MainMenu/OptionsMenu/OptionsMenu.js';
import ConfigButtons from './components/ConfigButtons/ConfigButtons.js';

import './styles/App.css';

const App = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [showCharacter, setShowCharacter] = useState(false);

  const displayMenu = () => {
      setShowCharacter(false);
      setShowOptions(false);
      setShowMenu(true);
  }

  const displayOptions = () => {
      setShowMenu(false);
      setShowCharacter(false);
      setShowOptions(true);
  }

  const displayCharacter = () => {
      setShowMenu(false);
      setShowOptions(false);
      setShowCharacter(true);
  }

  useEffect(() => {
    soundManager.init();
    //soundManager.playMenuMusic();
  });

  return (
    <div id='app' className='app'>

      { showMenu && <MainMenu displayOptions={displayOptions} displayCharacter={displayCharacter} /> }
      { showCharacter && <CharacterMenu displayMenu={displayMenu} /> }
      { showOptions && <OptionsMenu displayMenu={displayMenu} /> }
      <ConfigButtons />
    </div>
  );
}
export default App;