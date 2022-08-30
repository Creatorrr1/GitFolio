// import "../Home";
// import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import client from '../../client.js';
import './signIn.css'
import { loggedInUserContext } from '../../helper/loggedInUserContext.js';


function SignIn({ userId, setUserId }) {

    // const [user, setUser] = useState({});
    const [details, setDetails] = useState({ username: "", password: "", email: "" })
    let navigate = useNavigate();
    const [loginError, setLoginError] = useState(false);
    const [loginResponse, setLoginResponse] = useState("")
    const { loggedInUser, setLoggedInUser } = useContext(loggedInUserContext);

    useEffect(() => {
        const loadedToken = localStorage.getItem(process.env.REACT_APP_USER_TOKEN) || '';
        setLoginResponse({ data: { token: loadedToken } });
    }, []);

    const loginUser = (e) => {
      console.log('in loginUser() and making request')
      client
        .post('/login', details, false)
        // .then((data) => data.json())
        .then((res) => {
          localStorage.setItem(
            process.env.REACT_APP_USER_TOKEN,
            res.data.data.token
          );
            localStorage.setItem(
              'loggedInUser',
            JSON.stringify(res.data.data.data)
          );
          console.log('res -> ',res.data.data)
          setLoggedInUser(res.data.data.data);
          // saveFetchedExerciseData(res.data.data.favouriteExercises)
          console.log('USERId -->', res.data.data.data.id)
          setUserId(res.data.data.data.id)
          navigate(`../profile/${res.data.data.data.id}`, { replace: true });
        })
        .catch((err) => {
          console.log('err response in catch ->', err)
          // setLoginError(err.response.status, err.response.data.message);
        });
    };

    const submitHandler = e => {
        e.preventDefault();
        // console.log(loginResponse)
        loginUser()
    }

    return (
      <>
    {/* <video className='video-2' src='/assets/videos/video-1.mp4' autoPlay loop muted /> */}

      <div className='form-container'>
      <form onSubmit={submitHandler}>
        <div className='form-inner'>
            <h1>Login</h1>
            <br></br>
            <div className='form-group'>
                <label htmlFor='username'>Username: </label>
                <input type='text' name='username' id='username' onChange={e => setDetails({...details, username: e.target.value})} value={details.username}/>
            </div>
            <br></br>
            <div className='form-group'>
                <label htmlFor='password'>Password: </label>
                <input type='password' name='password' id='password' onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
            </div>
            <br></br>
            <div className='form-group'>
                <label htmlFor='email'>Email: </label>
                <input type='text' name='email' id='email' onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
            </div>
            <br></br>
            {loginError && <div className='error'>{loginError}</div>}
            <input type='submit' value='LOGIN' onSubmit={submitHandler}/>
        </div>
      </form>
      </div>
    {/* </video> */}
      </>
    );
}
  export default SignIn