import React from 'react';
import './profile.css'
// import '../../App.css';
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loggedInUserContext } from '../../helper/loggedInUserContext.js';
import client from "../../client";
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';

function Profile({favouriteExercises, setFavouriteExercises, userID}) {
    const { loggedInUser } = useContext(loggedInUserContext);
    const [userData, setUserData] = useState({});
    const [isValidId, setIsValidId] = useState(true);
    // another useEffect for exercises also watching the params and fetching by id
    const params = useParams();
    const [addExercise, setAddExercise] = useState({githubImage: "", githubUrl: "", profileId: ""})
    const [addExercises, setAddExercises] = useState("")
    const [exerciseResponse, setExerciseResponse] = useState('')
    const [error, setError] = useState(true)
    // const [checkParams, setCheckParams] = useState(false)
    let navigate = useNavigate();

    useEffect(() => {
        const loadedToken = localStorage.getItem(process.env.REACT_APP_USER_TOKEN) || '';
        if (!loadedToken) {
            navigate("/");
          }
    },[])

    // if(checkParams) {
    //     navigate(`../`, { replace: true });
    // }

    // useEffect(() => {
    //     let profileId = params.id
    //     if (profileId === undefined) {
    //         setCheckParams(true)
    //     }
    //     if (profileId === ':id') {
    //         setCheckParams(true)
    //     }
    // }
    // ,[params])

    useEffect(() => {
        client
          .get(`/user/${loggedInUser.id}`)
          .then((res) => {
            setUserData(res.data.data);
            console.log('id is valid? : ', isValidId)
            // console.log('USER Data -> ', res.data.data)
            setAddExercise({...addExercise, profileId: res.data.data.profileId})
          })
          .catch((err) => {
            setIsValidId(false);
            console.log('id is valid? : ', isValidId)
          });
    }, [params]);

    // console.log('USER Data -> ', userData)

    const createFavouriteExercise = async (event) => {
		setError(false);
		event.preventDefault();
		try {
			const res = await client.post('/favouriteExercises', addExercise);
			setExerciseResponse(res.data);
            console.log('Added Exercise Response -->', exerciseResponse.status)
			const res2 = await client.get('/favouriteExercises');
            setAddExercises(res2.data.data.favouriteExercises)
			// setFavouriteExercises(res2.data.data.favouriteExercises);
            console.log('favouriteExerciseData Res -> ', res2.data.data.favouriteExercises)
		} catch (err) {
			setError(err.response.data.data.err);
		}
	};
    
    console.log('FavouriteExercisesData -> ',addExercises)

    useEffect(() => {
        client
          .get('/favouriteExercises')
          .then((res) => {
            // console.log('all data fetched in profile', res.data)
            setAddExercises(res.data.data.favouriteExercises)
			// setFavouriteExercises(res.data.data.favouriteExercises);
            console.log('favouriteExerciseData UseEffect fetch -> ', res.data.data.favouriteExercises)
          })
          .catch((err) => {
            console.log(err)
          });
    }, [params]);

    const fExerciseDlt = (event, exerciseId) => {
        event.preventDefault()
        client
        .delete(`/favouriteExercises/${exerciseId}`)
        .then((res) => {
            console.log('res for fExerciseDlt', res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

  return (
    <>
    <div className='container'>
        <div className='two-column-grid-page'>
            <div className='profile-column'>
                <div className='two-profile-row-grid gap-sm-1'>
                <div className='profile-pic-box'>
                <img src='/assets/ape.png' alt='todo image' className='profile-img transparent'/>
                </div>
                <div className='profile-data-box gap'>
                    <div className='user-info-box'>
                    <div>Username: {userData.username}</div>
                    </div>
                    <div className='user-info-box'>
                    <div>Email: {userData.email}</div>
                    </div>
                    <div className='user-info-box'>
                    <div>Firstname: {userData.firstName}</div>
                    </div>
                    <div className='user-info-box'>
                    <div>Lastname: {userData.lastName}</div>
                    </div>
                    {/* <div className='user-info-box'>
                    <div>ID: {userData.id}</div>
                    </div> */}
                    <div className='user-info-bio-box'>
                    <div>Bio: <div>{userData.bio}</div></div>
                    </div>
                    </div>
                </div>
            </div>
            <div className='exercise-column'>
                {/* auto rows with 3 exercise max for each row */
                 // map favourite exercise here 
                 // in the meantime manually add the rows 
                }
                <div className='add-exercise-row'>
                    <div className='add-exercise-box'>
                        {/* <form id='exerciseForm' onSubmit={createFavouriteExercise}> */}
                            <div className='two-search-column-grid'>
                            <input
                                className='exercise-input gap-inputs'
                                type='text'
                                // label='Add Exercise Image'
                                placeholder='Add Exercise Image'
                                // variant='outlined'
                                name='githubImage'
                                value={addExercise.githubImage}
                                onChange={e => setAddExercise({...addExercise, githubImage: e.target.value})} 
                                />
                            <input
                                className='exercise-input gap-inputs'
                                type='text'
                                // label='Add Exercise Github url'
                                placeholder='Add Exercise Github url'
                                // variant='outlined'
                                name='githubUrl'
                                value={addExercise.githubUrl}
                                onChange={e => setAddExercise({...addExercise, githubUrl: e.target.value})} 
                                ></input>
                        <button type='submit' 
                                // variant='contained' 
                                className='exercise-add-btn' 
                                onClick={createFavouriteExercise}>
                        Add favouriteExercise
                        </button>
                                </div>
                        {/* </form> */}
                    </div>
                </div>
                <div className='grid-auto-rows gap-sm '>
                    <ul className='exercise-auto-column'>
                        { addExercises && addExercises.map((exercise,index) => (
                         <li className='exerciseBox' key={index}>
                            <div className='git-img-box'>
                            { exercise.githubImage !== '' ?
                            <img src={exercise.githubImage} alt='github-img' className='git-img'/> : <div><p>add image</p></div>
                            }  
                            </div>
                            <div className='git-url-box'>
                            <div>Highlighted-Project: </div>
                            {
                                exercise.githubUrl !== '' ?
                                <div>
                                    <a href={exercise.githubUrl} className='a-url-max-size'>{exercise.githubUrl}</a>
                                    {/* <button>Delete</button> */}
                                </div>
                                : <div>
                                    <p>add url</p>
                                  </div>
                            }
                            <button className='fExerciseDltBtn' onClick={(event) => {fExerciseDlt(event, exercise.id)}}>Delete</button>
                            </div>
                        </li>
                        ))
                        }
                        {/* <li className='exerciseBox'>
                            <div className='git-img-box'>
                                <img src='/assets/todo-github-image.png' alt='todo image' className='git-img'/>
                                </div>
                            <div className='git-url-box'>
                                <div>Highlighted-Project: </div>
                                <div><a href='https://github.com/Creatorrr1/js-dom-pokemon-cards' className='a-url-max-size'>https://github.com/Creatorrr1/js-dom-pokemon-cards</a></div>
                            </div>
                        </li>
                        <li className='exerciseBox'>
                            <div className='git-img-box'>
                            <img src='/assets/pokemon.png' alt='todo image' className='git-img'/>
                            </div>
                            <div className='git-url-box'>
                            <div>Highlighted-Project: </div>
                                <div><a href='https://github.com/Creatorrr1/js-dom-pokemon-cards' className='a-url-max-size'>https://github.com/Creatorrr1/js-dom-pokemon-cards</a></div>
                            </div>
                        </li>
                        <li className='exerciseBox'>
                            <div className='git-img-box'>
                            <img src='/assets/black.png' alt='todo image' className='git-img'/>
                            </div>
                            <div className='git-url-box'>                                
                            <div>Highlighted-Project: </div>
                                <div><a href='https://github.com/Creatorrr1/js-dom-pokemon-cards' className='a-url-max-size'>https://github.com/Creatorrr1/js-dom-pokemon-cards</a></div></div>
                        </li>
                    </ul>
                    <ul className='exercise-auto-column'>
                        <li className='exerciseBox'>
                            <div className='git-img-box'>
                            <img src='/assets/weather.png' alt='todo image' className='git-img'/>
                            </div>
                            <div className='git-url-box'>
                            <div>Highlighted-Project: </div>
                                <div><a href='https://github.com/Creatorrr1/js-dom-pokemon-cards' className='a-url-max-size'>https://github.com/Creatorrr1/js-dom-pokemon-cards</a></div>
                            </div>
                        </li>
                        <li className='exerciseBox'>
                            <div className='git-img-box'>
                            <img src='/assets/cohort.png' alt='todo image' className='git-img'/>
                            </div>
                            <div className='git-url-box'>
                            <div>Highlighted-Project: </div>
                                <div><a href='https://github.com/Creatorrr1/js-dom-pokemon-cards' className='a-url-max-size'>https://github.com/Creatorrr1/js-dom-pokemon-cards</a></div>
                            </div>
                        </li> 
                        <li className='exerciseBox'>
                        <div className='git-img-box'>
                        { addExercise[0].githubImage !== '' ?
                        <img src={addExercise[0].githubImage} alt='github-img' className='git-img'/> : <div><p>add image</p></div>
                        }  
                        </div>
                        <div className='git-url-box'>
                        <div>Highlighted-Project: </div>
                        {
                            addExercise[0].githubUrl !== '' ?
                            <div><a href={addExercise[0].githubUrl} className='a-url-max-size'>{addExercise[0].githubUrl}</a></div>
                            : <div><p>add url</p></div>
                        }
                        </div>
                    </li> */}
                    </ul>
                </div>
            </div>
        </div>
    </div>
    </>
  );
}

export default Profile;