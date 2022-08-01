import React from 'react';
import './profile.css'
import '../../App.css';

function Profile({favouriteExercises, setFavouriteExercises}) {
  return (
    <>
    <div className='container'>
        <div className='two-column-grid-page'>
            <div className='profile-column'></div>
            <div className='exercise-column'>
                {/* auto rows with 3 exercise max for each row */
                 // map favourite exercise here 
                 // in the meantime manually add the rows 
                }
                <div className='grid-auto-rows'>
                    <ul className='exercise-auto-column'>
                        <li className='exerciseBox'></li>
                        <li className='exerciseBox'></li>
                        <li className='exerciseBox'></li>
                    </ul>
                    <ul className='exercise-auto-column'>
                        <li className='exerciseBox'></li>
                        <li className='exerciseBox'></li>
                        <li className='exerciseBox'></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    </>
  );
}

export default Profile;