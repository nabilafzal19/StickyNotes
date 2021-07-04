
import React from 'react';
import { useState,useReducer } from 'react';
import './App.css'
const intialNotesState ={
  lastNoteCreated: null,
  totalNotes:0,
  notes:[],
}

const notesReducer = (prevState,action)=>{
     switch(action.type)
     {
       case 'ADD_NOTE':{
         const newState = {
          lastNoteCreated: new Date().toTimeString().slice(0,8),
          totalNotes: prevState.notes.length,
          notes:  [...prevState.notes,action.payload],
         };
         console.log(newState);
         return newState;
       }
       default:
            return;
     }
}

 const App = () => {
   const [noteInput,setNoteInput] = useState('');
   const [notesState,dispatch] = useReducer(notesReducer,intialNotesState)
   const addNote = (event)=>{
    event.preventDefault();
    console.log(notesState)
     if(!noteInput)
     return;
     
     const newNote ={
       id:Math.random(),
       text: noteInput,
       rotate:Math.floor(Math.random() *20),
     };
     dispatch({type:'ADD_NOTE' ,payload:newNote});
     setNoteInput("");

    
   }
   const dropNote = (event)=> {
 
    event.target.style.left = `${event.pageX-50}px`;
    event.target.style.top = `${event.pageY - 50}px`;

   }
   const dragOver= (event)=>{
      event.stopPropagation();
      event.preventDefault();
   }
  return (
    <div className="app" onDragOver={dragOver}>
      <h1>Sticky Notes</h1>

      <form onSubmit={addNote} className="note-form"> 
       <textarea placeholder="create your note here" value={noteInput}onChange={(event)=>setNoteInput(event.target.value)}></textarea>
        <button>Add</button>
      </form>
     {notesState.notes.map(note =>(
        <div className="note" style={{transform:`rotate(${note.rotate}deg)`}} draggable="true" onDragEnd={dropNote}>
          <pre className="text">{note.text}</pre>
          </div>
     ))}
    </div>
  )
}

export default App;