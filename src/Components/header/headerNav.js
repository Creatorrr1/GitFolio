import "./headerNav.css"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

function HeaderNav({ userId }) {
  const [token, setToken] = useState(false)
  let navigateTo = useNavigate()

  useEffect(() => {
    const loadedToken = localStorage.getItem(process.env.REACT_APP_USER_TOKEN)
    const loggedInUser = localStorage.getItem("loggedInUser")
    console.log("loggedInUser _-_->", loggedInUser)

    loggedInUser !== null ? setToken(true) : setToken(false)
  }, [])

  // const goProfile = () => {
  //   // console.log('loggedInUserID', loggedInUser)
  //   // navigateTo(`../profile/${loggedInUser.id}`, { replace: true });
  //   navigateTo(`../profile/${userId}`, { replace: true });
  // }

  const findProfile = () => {
    navigateTo("/")
  }

  const logout = (e) => {
    console.log("Logout")
    // e.preventDefault();
    localStorage.setItem(process.env.REACT_APP_USER_TOKEN, "")
    localStorage.removeItem("loggedInUser")
    navigateTo("../", { replace: true })
  }

  // const loggedInUser = localStorage.getItem('loggedInUser');
  // const profileUrl = `/profile/${loggedInUser.id}`

  return (
    <>
      <div id="PageContainer">
        <header className="header grid-in-grid2">
          <div class="logo-box">
            <div class="inner-logo-box">
              <Link to="/" className="link">
                <img src="/assets/black.png" alt="logo" className="logo-size" />
              </Link>
            </div>
          </div>
          <div class="bg-space-box expand">
            <div class="inner-empty-expand-box width-sm"></div>
          </div>
          <div class="nav-box auto-column-grid-header gap">
            <div class="inner-nav-search search-icon">
              {/* <form className='two-column-grid__expand-one'> */}
              <input type="text" name="text" className="search-box"></input>
              <input type="submit" name="search" className="search" onClick={findProfile}></input>
              {/* </form> */}
            </div>
            <div class="inner-nav-box">
              <Link to="/browse" className="link">
                <div className="nav-text">Browse</div>
              </Link>
            </div>
            {token && (
              // <div class="inner-nav-box">
              // <Link to ='/profile/:id' className='link'><div className='nav-text'>Profile</div></Link>
              // </div>
              <div class="inner-nav-box">
                <Link to="/profile/:id" className="link">
                  <div className="nav-text">Profile</div>
                </Link>
                {/* <button className='logout-link' onClick={goProfile}><div className='nav-text'>Profile</div></button> */}
              </div>
            )}
            {!token && (
              <div class="inner-nav-box">
                <Link to="/sign-in" className="link">
                  <div className="nav-text">Sign In</div>
                </Link>
              </div>
            )}
            {token && (
              <div class="inner-nav-box">
                {/* <Link to="/sign-in" className='link'><div className='nav-text'>Sign Out</div></Link> */}
                <button className="logout-link" onClick={logout}>
                  <div className="nav-text">Logout</div>
                </button>
              </div>
            )}
            {!token && (
              <div class="inner-nav-box">
                <Link to="/sign-up" className="link">
                  <div className="nav-text">Sign Up</div>
                </Link>
              </div>
            )}
          </div>
        </header>
        {/* <main className="main main-intro-container">
          <div className="main-intro-content">
            <h1 className="h1-center">My Domain 🏝</h1>
          </div>
        </main> */}
      </div>
    </>
  )
}
export default HeaderNav
