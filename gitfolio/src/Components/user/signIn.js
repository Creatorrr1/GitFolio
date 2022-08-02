// import "../Home";
// import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import client from '../../client.js';
import './signIn.css'


function SignIn({Login, fetchedExercises}) {

    // const [user, setUser] = useState({});
    const [details, setDetails] = useState({ username: "", password: "", email: "" })
    let navigate = useNavigate();
    const [loginError, setLoginError] = useState(false);
    const [loginResponse, setLoginResponse] = useState("")

    useEffect(() => {
        const loadedToken = localStorage.getItem(process.env.REACT_APP_USER_TOKEN) || '';
        setLoginResponse({ data: { token: loadedToken } });
      }, []);

    const loginUser = (event) => {
        console.log('in loginUser()')
        client
          .post('/login', details, false)
        //   .then((data) => data.json())
          .then((res) => {
            localStorage.setItem(
              process.env.REACT_APP_USER_TOKEN,
              res.data.data.token
            );
            localStorage.setItem(
              'loggedInUser',
              JSON.stringify(res.data.data.user)
            );
            console.log('res -> ',res.data.data)
            // setLoggedInUser(res.data.data.user);
            // saveFetchedExerciseData(res.data.data.favouriteExercises)
            navigate('../profile', { replace: true });
            console.log('res made')
          })
          .catch((err) => {
            console.log('In Catch')
            console.log('err response in catch', err)
            // setLoginError(err.response);
          });
    };

    const submitHandler = e => {
        e.preventDefault();
        Login(details)
        console.log(loginResponse)
        loginUser()
        // return loginUser
    }

    const saveFetchedExerciseData = data => {
        fetchedExercises(data)
    }

    return (
      <>
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
      </>
    );
}
  export default SignIn