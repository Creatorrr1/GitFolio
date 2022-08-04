import "./headerNav.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function HeaderNav() {

  let navigate = useNavigate();

  const goProfile = () => {
    navigate(`../profile/:id`, { replace: true });
  }
  return (
    <>
      <div id="PageContainer">
        <header className="header grid-in-grid2">
          <div class="logo-box">
            <div class="inner-logo-box">
              <Link to="/" className='link'>
              <img src="/assets/black.png" alt="logo" className='logo-size'/>
              </Link>
            </div>
          </div>
          <div class="bg-space-box expand">
            <div class="inner-empty-expand-box width-sm"></div>
          </div>
          <div class="nav-box four-column-grid gap">
            <div class="inner-nav-search search-icon">
              {/* <form className='two-column-grid__expand-one'> */}
              <input type='text' name='text' className='search-box'></input>
              <input type='submit' name='search' className='search' onSubmit={goProfile}></input>
              {/* </form> */}
            </div>
            <div class="inner-nav-box">
              <Link to ='/profile/:id' className='link'><div className='nav-text'>Profile</div></Link>
            </div>
            <div class="inner-nav-box">
            <Link to="/sign-in" className='link'><div className='nav-text'>Sign In</div></Link>
            </div>
            <div class="inner-nav-box"><Link to="/sign-up" className='link'><div className='nav-text'>Sign Up</div></Link></div>
          </div>
        </header>
        {/* <main className="main main-intro-container">
          <div className="main-intro-content">
            <h1 className="h1-center">My Domain 🏝</h1>
          </div>
        </main> */}
      </div>
    </>
  );
}
export default HeaderNav;
