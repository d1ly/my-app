import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import ClickCounter from "./hooksExercise";
import ToggleTheme from './theme';
import { ThemeContext, themes } from "./themeContext";


function App() {

  const [notes, setNotes] = useState(dummyNotesList); 
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
    favorited: false,
  };
  const [createNote, setCreateNote] = useState(initialNote);

  // functions for creating, updating, deleting notes
  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title: ", createNote.title);
    console.log("content: ", createNote.content);
    createNote.id = notes.length + 1;
    setNotes([createNote, ...notes]);
    setCreateNote(initialNote);
  };

  const updateNoteHandler = (id: number, updatedNote: Partial<Note>) => {
    setNotes(notes.map(note => (note.id  === id ? { ...note, ...updatedNote } : note)));
  };

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
    

  	<form className="note-form" onSubmit={createNoteHandler}>
    	<div>
      	<input
        	placeholder="Note Title"
        	onChange={(event) =>
          	setCreateNote({ ...createNote, title: event.target.value })}
        	required>
      	</input>
    	</div>

    	<div>
      	<textarea
        	onChange={(event) =>
          	setCreateNote({ ...createNote, content: event.target.value })}
        	required>
      	</textarea>
    	</div>

  <div>
     	<select
       	onChange={(event) =>
         	setCreateNote({ ...createNote, label: event.target.value as Label})}
       	required>
       	<option value={Label.personal}>Personal</option>
       	<option value={Label.study}>Study</option>
       	<option value={Label.work}>Work</option>
       	<option value={Label.other}>Other</option>
     	</select>
   	</div>

    	<div><button type="submit">Create Note</button></div>
  	</form>
      
      <div className="notes-grid">
       {notes.map((note) => (
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
           <h2 contentEditable onBlur={(event) =>
                updateNoteHandler(note.id, { title: event.currentTarget.textContent as string})
              }> {note.title} </h2>
           <p contentEditable onBlur={(event) =>
                updateNoteHandler(note.id, { content: event.currentTarget.textContent as string})
              }> {note.content} </p>
            <select value={note.label} onChange={(event) =>
                updateNoteHandler(note.id, { label: event.target.value as Label })
            } >
              <option value="Personal">Personal</option>
              <option value="Study">Study</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>
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