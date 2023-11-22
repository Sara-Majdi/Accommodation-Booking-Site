import { Link } from 'react-router-dom'
import AccountPageNavbar from '../../components/AccountPageNavbar';
import { useEffect, useState } from 'react';
import axios from 'axios';

const MyAccommodation = () => {

  const [accommodations, setAccommodations] = useState([]);
  useEffect(() => {
    // Getting Accommodations details that user added, from the database, to be displayed at '/account/accommodations'
    axios.get('/user-accommodations').then((response) => {
      setAccommodations(response.data);
    });
  }, []);


  return (
    
    <div>
        <AccountPageNavbar /> {/*Importing Nav Links*/}

        <div className='text-center mt-8'>
            <Link to={'/account/accommodations/new'} className='inline-flex bg-primary text-white px-4 py-2 gap-2 rounded-full'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>

                
                Add New Place
            </Link>
        </div>

        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
          {accommodations?.length <= 0 && (
            <p className='text-center text-2xl font-semibold'>You Have Not Added Any Accommodations</p>
          )}
      </div>

        <div className="mt-4">
          {accommodations.length > 0 && accommodations.map(place => (

            <Link to={'/account/accommodations/' + place._id} key={place} 
              className="flex gap-4 mb-4 bg-gray-100 rounded-2xl p-4 border border-gray-300" 
            >

              <div className="flex h-32 w-32 shrink-0 bg-gray-300 rounded-lg">
                {place.addedPhotos.length > 0 && (
                  <img className='object-cover rounded-lg' src={'http://localhost:4000/uploads/'+ place.addedPhotos[0]} alt="Main Unit Image" />
                )}
              </div>

              <div className="grow-0 shrink">
                <h2 className='text-2xl mb-2 font-semibold'>{place.title}</h2>
                <p className='text-sm py-2 text-justify whitespace-pre-line'>{place.description}</p>
              </div>
              
            </Link>
          ))}
        </div>
    </div>
  )
}

export default MyAccommodation