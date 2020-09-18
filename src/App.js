import React, { useState, useEffect } from 'react';
import { FormControl, Button, Input, InputLabel, Container } from '@material-ui/core';
import './App.css';
import Todo from './Todo';
import db from './firebase';
import * as firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([]); // creating empty array
  const [input, setInput] = useState(''); // reading the inputs

  // when the app loands we need to listen to the database and fetch new todos as they get added.
  // use Effect is a hook, it runs once when the app loads
  useEffect(() => {
    // this code here.. fires when app.js loads
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // console.log(snapshot.docs.map(doc => doc.data().todo ));
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo}) ));
    });
  }, []);

  console.log(input);

  // adding the todos to the list when button is clicked
  const addTodo = (event) => {
    event.preventDefault(); // prevent the entire page to refresh
    
    // adding input to firebase
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp() // gettring the firebase server  timestamp
    })

    setTodos([...todos, input]) 
    // spread the current list and append the next item
    // push the input to the todos
    setInput(''); // setting the input back to empty
  }
  return (
    <div className="App">
      <h1>Todo App</h1>
      {/* mapping the input to the state */}
      <FormControl>
        <InputLabel htmlFor="my-input">Write a todo</InputLabel>
        <Input value={input} onChange={event => setInput(event.target.value)}/>
      </FormControl>
      <Button disabled={!input} variant="contained" onClick={addTodo} color="primary">
        Add Item
      </Button>
      {/* Looping through the array */}
      <Container maxWidth="sm">
        <ul>  
          {todos.map(todo => ( // this todo is a entire
            // adding a component
            <Todo todo={todo}/>
          ))}
        </ul>
      </Container>
      
    </div>
  );
}

export default App;
