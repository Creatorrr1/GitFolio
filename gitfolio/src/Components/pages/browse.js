import React from "react"
import "./browse.scss"
// import '../../App.css';
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import client from "../../client"

function Browse() {
  const [profiles, setProfiles] = useState("")

  useEffect(() => {
    client
      .getAll(`/user`)
      .then((res) => {
        setProfiles(res.data.data)
        // console.log('id is valid? : ', isValidId)
        console.log("USER Data -> ", res.data.data)
        console.log("res.data.data[0].userName ->", res.data.data[0].userName)
        // setAddExercise({...addExercise, profileId: res.data.data.profileId})
      })
      .catch((err) => {
        console.log("Error : ", err)
      })
  }, [])

  return (
    <>
      <div className="browse-container">
        <video src="/assets/videos/video-1.mp4" autoPlay loop muted />
        <div className="two-grid-row">
          <h1>Explore the Git World</h1>
          <div class="search-container">
            <input type="text" placeholder="Search..." />
            <div class="search"></div>
          </div>
        </div>
        {/* <p>Git Your</p> */}
      </div>
      <div className="user-container">
        <div className="browse-grid-rows gap-sm ">
          <ul className="profiles-auto-column">
            <li className="profileBox">
              <div className="profile-pic-box">
                <img src="/assets/ape.png" alt="todo image" className="profile-img-1 transparent" />
              </div>
              <div className="viewProfileBox">
                <div className="displayName">Username</div>
                <button className="viewBtn">
                  <a href="https://github.com/Creatorrr1/js-dom-pokemon-cards">View GitFolio</a>
                </button>
              </div>
            </li>
            <li className="profileBox">
              <div className="profile-pic-box">
                <img src="/assets/ape.png" alt="todo image" className="profile-img-1 transparent" />
              </div>
              <div className="viewProfileBox">
                <div className="displayName">Username</div>
                <button className="viewBtn">
                  <a href="https://github.com/Creatorrr1/js-dom-pokemon-cards">View GitFolio</a>
                </button>
              </div>
            </li>
            <li className="profileBox">
              <div className="profile-pic-box">
                <img src="/assets/ape.png" alt="todo image" className="profile-img-1 transparent" />
              </div>
              <div className="viewProfileBox">
                <div className="displayName">Username</div>
                <button className="viewBtn">
                  <a href="https://github.com/Creatorrr1/js-dom-pokemon-cards">View GitFolio</a>
                </button>
              </div>
            </li>
          </ul>
          <ul className="profiles-auto-column">
            <li className="profileBox">
              <div className="profile-pic-box">
                <img src="/assets/ape.png" alt="todo image" className="profile-img-1 transparent" />
              </div>
              <div className="viewProfileBox">
                <div className="displayName">Username</div>
                <button className="viewBtn">
                  <a href="https://github.com/Creatorrr1/js-dom-pokemon-cards">View GitFolio</a>
                </button>
              </div>
            </li>
            <li className="profileBox">
              <div className="profile-pic-box">
                <img src="/assets/ape.png" alt="todo image" className="profile-img-1 transparent" />
              </div>
              <div className="viewProfileBox">
                <div className="displayName">Username</div>
                <button className="viewBtn">
                  <a href="https://github.com/Creatorrr1/js-dom-pokemon-cards">View GitFolio</a>
                </button>
              </div>
            </li>
            <li className="profileBox">
              <div className="profile-pic-box">
                <img src="/assets/ape.png" alt="todo image" className="profile-img-1 transparent" />
              </div>
              <div className="viewProfileBox">
                <div className="displayName">Username</div>
                <button className="viewBtn">
                  <a href="https://github.com/Creatorrr1/js-dom-pokemon-cards">View GitFolio</a>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Browse
