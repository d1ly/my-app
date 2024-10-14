import { ThemeContext, themes } from "./themeContext";
import ClickCounter from "./hooksExercise";
import React, { useState, useEffect, useContext } from 'react';
import App from "./App"

// Wrapper component to provide context
/*
function ToggleTheme() {
 const [currentTheme, setCurrentTheme] = useState(themes.light);

 const toggleTheme = () => {
   setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
 };

 return (
   <ThemeContext.Provider value={currentTheme}>
     <button onClick={toggleTheme}> Toggle Theme </button>
     <ClickCounter />

   </ThemeContext.Provider>
 );
}

export default ToggleTheme;

*/

function ToggleTheme({ toggleTheme }: { toggleTheme: () => void }) {
  return (
    <button onClick={toggleTheme}>
      Toggle Theme
    </button>
  );
}

export default ToggleTheme;