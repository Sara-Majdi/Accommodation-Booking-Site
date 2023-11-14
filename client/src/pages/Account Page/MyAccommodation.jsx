import { Link } from 'react-router-dom'
import AccountPageNavbar from '../../components/Account Page/AccountPageNavbar';
import { useEffect, useState } from 'react';
import axios from 'axios';

const MyAccommodation = () => {

  const [accommodations, setAccommodations] = useState([]);
  useEffect(() => {

    axios.get('/accommodations').then(({data}) => {
      setAccommodations(data);
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

        <div className="mt-4 ">
          {accommodations.length > 0 && accommodations.map(place => (

            <Link to={'/account/accommodations/' + place._id} className="flex gap-4 mb-4 bg-gray-100 rounded-2xl p-4" key={place}>

              <div className="flex h-32 w-32 shrink-0 bg-gray-300 rounded-lg">
                {place.addedPhotos.length > 0 && (
                  <img className='object-cover rounded-lg' src={'http://localhost:4000/uploads/'+ place.addedPhotos[0]} alt="Main Image" />
                )}
              </div>

              <div className="grow-0 shrink">
                <h2 className='text-xl mb-2 font-semibold'>{place.title}</h2>
                <p className='text-sm p-2 text-justify whitespace-pre-line'>{place.description}</p>
              </div>
              
            </Link>
          ))}
        </div>
    </div>
  )
}

export default MyAccommodation