import { useEffect, useState } from "react"
import axios from 'axios';

const HomePage = () => {
  const [accommodations, setAccommodations] = useState([]);
  useEffect(() => {
    axios.get('/accommodations').then(response => {

      setAccommodations([...response.data, ...response.data, ...response.data, ...response.data]);
    })


  }, []);

  return (
    <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8" >
      {accommodations.length > 0 && accommodations.map(place => (

        <div className="" key={place.id}>
          
          <div className="bg-gray-500 rounded-2xl">
            {place.addedPhotos?.[0] && (
              <img 
                src={"http://localhost:4000/uploads/" + place.addedPhotos[0]} 
                alt="Main Unit Image" 
                className="rounded-2xl object-cover aspect-square"
              />
            )}
          </div>
          
          <h2 className="font-bold truncate mt-2">{place.address}</h2>
          <h3 className="text-gray-500 text-sm mt-1 truncate">{place.title}</h3>
          <div className="mt-1">
            <p><span className="font-bold">RM{place.price}</span> per night</p>
          </div>
          
        </div>

      ))}

    </div>
  )
}

export default HomePage