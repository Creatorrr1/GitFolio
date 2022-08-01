// import "../Home";
// import { Link } from 'react-router-dom';
import { useState} from 'react'
import { useNavigate } from 'react-router-dom';
import client from '../../client';
import './signUp.css';

function SignUp() {

  const [userRegister, setUserRegister] = useState({ username: "", password: "", email: "" })
  const [errorResponse, setErrorResponse] = useState({ status: '' });
  let navigate = useNavigate();

  const registerUser = (event) => {
    console.log('in registerUser()')
    event.preventDefault();
    client
    .post('/user', userRegister, false)
    .then((res) => {
        localStorage.setItem(process.env.REACT_APP_USER_TOKEN, res.data.data.token);
        localStorage.setItem('loggedInUser', JSON.stringify(res.data.data.user));
        // setLoggedInUser(res.data.data.user)
        console.log('res made')
        navigate('../profile', { replace: true });
    })
    .catch((err) => { 
      console.log('in catch')
      setErrorResponse(err.response)
    });
  };

  return (
    <>
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