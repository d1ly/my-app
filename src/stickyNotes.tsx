import './App.css';
import React, { useState} from 'react';
import { Label, Note } from "./types"; 
import { dummyNotesList } from "./constants"; 
//import ClickCounter from "./hooksExercise";
import ToggleTheme from './theme';
import { ThemeContext, themes } from "./themeContext";


export const StickyNotes= () => {
  // functions for creating, updating, deleting notes
  const [notes, setNotes] = useState(dummyNotesList); 
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
    favorited: false,
  };

  const [createNote, setCreateNote] = useState(initialNote);
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

  const deleteNoteHandler = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // function for favorites
  const [, setFavoriteTitles] = useState<string[]>([]); 
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

  const [currentTheme, setCurrentTheme] = useState(themes.light);
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
          value={createNote.title}
        	onChange={(event) =>
          	setCreateNote({ ...createNote, title: event.target.value })}
        	required>
      	</input>
    	</div>

    	<div>
      	<textarea
          placeholder="Note Content"
          value={createNote.content}
        	onChange={(event) =>
          	setCreateNote({ ...createNote, content: event.target.value })}
        	required>
      	</textarea>
    	</div>

  <div>
     	<select
        value={createNote.label}
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
            <button data-testid={`delete-note-${note.id}`} 
              onClick={() => deleteNoteHandler(note.id)}>x
            </button>
           </div>
           <h2 contentEditable data-testid={`note-title-${note.id}`} onBlur={(event) => {
                const updatedTitle = event.currentTarget.textContent || ""; 
                updateNoteHandler(note.id, { title: updatedTitle });
              }} suppressContentEditableWarning={true} > {note.title === "" ? "Empty" : note.title} </h2>
           <p contentEditable data-testid={`note-content-${note.id}`} onBlur={(event)  =>{
                const updatedContent = event.currentTarget.textContent || ""; 
                updateNoteHandler(note.id, { content: updatedContent})
              }} suppressContentEditableWarning={true} > {note.content === "" ? "Empty" : note.content} </p>
            <select value={note.label} data-testid={`note-label-${note.id}`} onChange={(event) =>
                updateNoteHandler(note.id, { label: event.target.value as Label })
            } >
              <option value={Label.personal}>Personal</option>
              <option value={Label.study}>Study</option>
              <option value={Label.work}>Work</option>
              <option value={Label.other}>Other</option>
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

export default StickyNotes;