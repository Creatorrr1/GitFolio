import "./home.css";
import { Link } from 'react-router-dom';
function HomePage() {
  return (
    <>
      <div id="PageContainer">
        {/* <h1 className='Title'>My Domain 🏝</h1> */}
        <header className="header grid-in-grid2">
          <div class="logo-box">
            <div class="inner-box">
              <Link to="/">
              <img src="../../assets/black.png" alt="logo"/>
              </Link>
            </div>
          </div>
          <div class="bg-space-box expand">
            <div class="inner-box width-sm"></div>
          </div>
          <div class="nav-box three-column-grid gap">
            <div class="inner-nav-box"></div>
            <div class="inner-nav-box"></div>
            <div class="inner-nav-box"><Link to="/sign-up">Sign Up</Link></div>
          </div>
        </header>
        <main className="main main-intro-container">
          <div className="main-intro-content">
            <h1 className="h1-center">My Domain 🏝</h1>
          </div>
        </main>
        <footer></footer>
      </div>
    </>
  );
}
export default HomePage;
