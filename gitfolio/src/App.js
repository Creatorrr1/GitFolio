import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import HeaderNav from './Components/header/headerNav.js';
import Home from './Components/pages/home.js'
import SignUp from './Components/user/signUp.js'
import SignIn from './Components/user/signIn.js'
import Profile from './Components/pages/profile.js'
import './App.css';
import Browse from './Components/pages/browse.js';
import { loggedInUserContext } from './helper/loggedInUserContext.js';

function App() {

  const [user, setUser] = useState({ username: "", password: "", email: "" })
  const [userID, setUserID] = useState("")
  const [favouriteExercises, setFavouriteExercises] = useState({})
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem('loggedInUser'))
  );

  const Login = detailsID => {
    console.log(detailsID)
    setUserID(detailsID)
  }

  const fetchedExercises = allSavedExercises => {
    setFavouriteExercises(allSavedExercises)
  }

  // const Logout = () => {
  //   console.log("Logout")
  // }

  return (
    <div className="App">
      {/* <h1>My Domain 🏝</h1> */}
      <loggedInUserContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser
      }}
      >
      <HeaderNav/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/sign-in' element={<SignIn Login={Login} fetchedExercises={fetchedExercises}/>} />
        <Route path='/profile/:id' element={<Profile setFavouriteExercise={setFavouriteExercises} favouriteExercise={favouriteExercises} userID={userID}/>} />
        <Route path='/browse' element={<Browse/>} />
      </Routes>
      </loggedInUserContext.Provider>
    </div>
  );
}

export default App;
