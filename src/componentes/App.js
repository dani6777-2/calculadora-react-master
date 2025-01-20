import Display from "./Display";
import PanelDeBotones from "./PanelDeBotones";
import { useState, useEffect, useCallback } from "react";
import operaciones from "../logic/operaciones";
import './App.css';

const App = () => {
  const [state, setState] = useState({
    total: null,
    siguiente: null,
    operador: null,
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleClick = useCallback((nombreDeBoton) => {
    setState(prevState => operaciones(prevState, nombreDeBoton));
  }, []);

  const handleKeyPress = useCallback((event) => {
    const key = event.key;
    const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '=', 'Enter', 'Escape'];
    
    if (validKeys.includes(key)) {
      event.preventDefault();
      let buttonKey = key;
      
      if (key === 'Enter') buttonKey = '=';
      if (key === 'Escape') buttonKey = 'AC';
      if (key === '*') buttonKey = 'x';
      
      handleClick(buttonKey);
    }
  }, [handleClick]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className={`component-app ${isDarkMode ? 'dark-mode' : ''}`}>
      <button 
        onClick={toggleTheme}
        className="theme-toggle"
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>
      <Display value={state.siguiente || state.total || "0"} />
      <PanelDeBotones clickHandle={handleClick} />
    </div>
  );
};

export default App;
