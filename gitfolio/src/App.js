import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useState } from "react"
import HeaderNav from "./Components/header/headerNav.js"
import Home from "./Components/pages/home.js"
import SignUp from "./Components/user/signUp.js"
import SignIn from "./Components/user/signIn.js"
import Profile from "./Components/pages/profile.js"
import "./App.css"
import Browse from "./Components/pages/browse.js"
import { loggedInUserContext } from "./helper/loggedInUserContext.js"

function App() {
  const [userId, setUserId] = useState("")
  const [loggedInUser, setLoggedInUser] = useState(
    // JSON.parse(localStorage.getItem('loggedInUser'))
    localStorage.getItem("loggedInUser")
  )

  return (
    <div className="App">
      {/* <h1>My Domain 🏝</h1> */}
      <loggedInUserContext.Provider
        value={{
          loggedInUser,
          setLoggedInUser,
        }}
      >
        <HeaderNav userId={userId} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn userId={userId} SetUserId={setUserId} />} />
          <Route path={`/profile/${loggedInUser.id}`} element={<Profile />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </loggedInUserContext.Provider>
    </div>
  )
}

export default App
