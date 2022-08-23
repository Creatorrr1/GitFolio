// import "../Home";
// import { Link } from 'react-router-dom';
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import client from '../../client';
import './signUp.css';
import { loggedInUserContext } from '../../helper/loggedInUserContext.js';

function SignUp() {

  const [userRegister, setUserRegister] = useState({ username: "", password: "", email: "", firstname: "", lastname: "", bio: "" , profileImage: ""})
  const [errorResponse, setErrorResponse] = useState({ status: '' });
  const [saveUser, setSaveUser] = useState({})
  const { loggedInUser, setLoggedInUser } = useContext(loggedInUserContext);
  let navigate = useNavigate();

  const obj = []
  console.log('SavedUser >>>>',saveUser)
  
  const registerUser = (event) => {
    console.log('in registerUser()')
    event.preventDefault();
    client
    .post('/user', userRegister, false)
    .then((res) => {
        localStorage.setItem(process.env.REACT_APP_USER_TOKEN, res.data.data.token);
        localStorage.setItem('loggedInUser', JSON.stringify(res.data.data.data));
        setSaveUser(res.data.data.user)
        setLoggedInUser(res.data.data.data)
        console.log('res made')
        navigate(`../profile/${loggedInUser.id}`, { replace: true });
        // navigate(`../profile/${res.data.data.user.id}`, { replace: true });
    })
    .catch((err) => { 
      console.log('in catch')
      setErrorResponse(err.response)
    });
  };

  return (
    <>
    {/* <video className='video-2' src='/assets/videos/video-1.mp4' autoPlay loop muted /> */}
       <div className="form-container">
          <form onSubmit={registerUser}>
          <div className='form-inner'>
            <h1>Sign-Up</h1>
            <br></br>
            <div className='form-group'>
            <label htmlFor="username">Username : </label>
            <input type="text" name="username" id="username" placeholder="Type Username" minlength="5" onChange={e => setUserRegister({...userRegister, username: e.target.value})} value={userRegister.username}/>
            </div>
            <br></br>
            <div className='form-group'>
            <label htmlFor="password">Password : </label>
            <input type="text" name="password" id="password" placeholder="Type Password" minlength="5" onChange={e => setUserRegister({...userRegister, password: e.target.value})} value={userRegister.password}/>
            </div>
           <br></br>
            {/* <label for="password-confirm">Confirm Password : </label>
            <input type="text" name="username" id="password-confirm" placeholder="Confirm Password" minlength="5" onChange={e => setUserRegister({...userRegister, username: e.target.value})} value={userRegister.username}/>
            <br></br> */}
            <div className='form-group'>
            <label htmlFor="email">Email : </label>
            <input type="email" name="email" id="email" placeholder="Type email" onChange={e => setUserRegister({...userRegister, email: e.target.value})} value={userRegister.email}/>
            </div>
            <br></br>
            <div className='form-group'>
            <label htmlFor="firstname">Firstname : </label>
            <input type="text" name="firstname" id="firstname" placeholder="Type firstname" onChange={e => setUserRegister({...userRegister, firstname: e.target.value})} value={userRegister.firstname}/>
            </div>
            <br></br>
            <div className='form-group'>
            <label htmlFor="lastame">Lastname : </label>
            <input type="text" name="lastame" id="lastame" placeholder="Type lastname" onChange={e => setUserRegister({...userRegister, lastname: e.target.value})} value={userRegister.lastname}/>
            </div>
            <br></br>
            <div className='form-group'>
            <label htmlFor="bio">Bio : </label>
            <input type="text" name="bio" id="bio" placeholder="Type your Bio here ..." onChange={e => setUserRegister({...userRegister, bio: e.target.value})} value={userRegister.bio}/>
            </div>
            <br></br>
            <div className='form-group'>
            <label htmlFor="profileImage">Profile Image : </label>
            <input type="text" name="profileImage" id="profileImage" placeholder="Add your profile image here ..." onChange={e => setUserRegister({...userRegister, profileImage: e.target.value})} value={userRegister.profileImage}/>
            </div>
            <br></br>
            <p> {errorResponse.status === 400 && errorResponse.data.data.username} </p>
            <input type="submit" value="Sign Up" onSubmit={registerUser}/>
            {/* <div>
                <input type="checkbox" name="terms" id="terms" required/>
                <label for="terms">I accept the <a>Terms And Conditions.</a></label>
                <h3>H3</h3>
            </div> */}
            {/* <br></br>
            <button type="submit">Submit</button> */}
          </div>
          </form>
        </div>
    </>
  );
}
export default SignUp