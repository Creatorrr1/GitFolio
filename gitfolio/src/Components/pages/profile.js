import React from 'react';
import './profile.css'
import '../../App.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../../client";
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';

function Profile({favouriteExercises, setFavouriteExercises, userID}) {

    const [userData, setUserData] = useState({});
    const [isValidId, setIsValidId] = useState(true);
    // another useEffect for exercises also watching the params and fetching by id
    const params = useParams();
    const [addExercise, setAddExercise] = useState({githubImage: "", githubUrl: ""})
    const [addExercises, setAddExercises] = useState({githubImage: '', githubUrl: ''})
    const [exerciseResponse, setExerciseResponse] = useState('')
    const [error, setError] = useState(true)

    useEffect(() => {
        client
          .get(`/user/${userID}`)
          .then((res) => {
            setUserData(res.data.data);
            console.log('id is valid? : ', isValidId)
          })
          .catch((err) => {
            setIsValidId(false);
            console.log('id is valid? : ', isValidId)
          });
    }, [params]);

    console.log(userData)

    const createFavouriteExercise = async (event) => {
		setError(false);
		event.preventDefault();
		try {
			const res = await client.post('/favouriteExercises', addExercise);
			setExerciseResponse(res.data);
            console.log('Added Exercise Response -->', exerciseResponse.status)
			const res2 = await client.get('/favouriteExercises');
			// setFavouriteExercises(res2.data.data.favouriteExercise);
            setAddExercises(res2.data.data.favouriteExercise)
            console.log('favouriteExercise --> ', res2.data.data.favouriteExercise)
		} catch (err) {
			setError(err.response.data.data.err);
		}
	};

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
                        <li className='exerciseBox'>
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
                            { addExercises.githubImage !== '' ?
                            <img src={addExercises.githubImage} alt='github-img'/> : <div><p>add image</p></div>
                            }
                        </div>
                            {/* <div className='git-img-box'>{error ? favouriteExercises.githubImage : <p>none</p>}</div> */}
                            {/* <p>Status: {exerciseResponse.status}</p> */}
                            <div className='git-url-box'>
                            <div>Highlighted-Project: </div>
                            {
                                addExercises.githubUrl !== '' ?
                                <div><a href={addExercises.githubUrl} className='a-url-max-size'>{addExercises.githubUrl}</a></div>
                                : <div><p>add url</p></div>
                            }
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    </>
  );
}

export default Profile;