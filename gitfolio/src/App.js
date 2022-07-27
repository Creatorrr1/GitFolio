import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Components/Home/homePage.js';
// import SignUp from './Components/registration/signUp.js'
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <h1>My Domain 🏝</h1> */}
      <Routes>
        <Route path='/' element={<HomePage/>} />
        {/* <Route path='/sign-up' element={<SignUp/>} /> */}
      </Routes>
    </div>
  );
}

export default App;
