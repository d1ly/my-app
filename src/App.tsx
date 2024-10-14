import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import ClickCounter from "./hooksExercise";
import ToggleTheme from './theme';
import { ThemeContext, themes } from "./themeContext";


function App() {

  const [notes, setNotes] = useState(dummyNotesList.map(note => ({ ...note, favorited: false }))); 
  const [favoriteTitles, setFavoriteTitles] = useState<string[]>([]); 
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  // function for favorites
  const toggleFavorite = (id: number) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {

        if (!note.favorited) {
          setFavoriteTitles((prevFavorites) => prevFavorites.concat(note.title)); 
        } else {
          setFavoriteTitles((prevFavorites) => prevFavorites.filter((title) => title !== note.title));
        }
        return { ...note, favorited: !note.favorited };
      }
      return note;
    });
    setNotes(updatedNotes);
  };
  const favoritedNotes = notes.filter(note => note.favorited);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

 return (
  <ThemeContext.Provider value={currentTheme}>
   <div className='app-container' style={{ background: currentTheme.background, color: currentTheme.foreground}}>
    
      <form className="note-form">
            <div><input placeholder="Note Title"></input></div>

            <div><textarea></textarea></div>

            <div><button type="submit">Create Note</button></div>
            
      </form>
      
      <div className="notes-grid">
       {dummyNotesList.map((note) => (
         <div
           key={note.id}
           className="note-item" 
           style={{ background: currentTheme.background, color: currentTheme.foreground }}>
           <div className="notes-header">
            
           <button onClick={() => toggleFavorite(note.id)}>
              {note.favorited ? "❤️" : "♡"}
            </button>
             <button>x</button>
           </div>
           <h2> {note.title} </h2>
           <p> {note.content} </p>
           <p> {note.label} </p>
         </div>
       ))}
      </div>

      <div>
        <h2>List of favorites</h2>
          <ul>{favoritedNotes.map((note) => (<li key={note.id}>{note.title}</li>))}</ul>
      </div>
    

      <div>
        <ToggleTheme toggleTheme={toggleTheme} />
      </div>
</div>
</ThemeContext.Provider>
 );
}

export default App;

/*
function ListItem(item: Note) {
  return (
      <li key={item.title}> name={item.title} /{item.title}</li>
  )
}
*/