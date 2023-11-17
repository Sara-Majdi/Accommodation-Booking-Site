import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import axios from 'axios';
import SearchBar from "../components/SearchBar";

const HomePage = () => {

  // Initialize all States 
  const [searchTerm, setSearchTerm] = useState('');
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => { 
    //Get the places that are added in the database
    axios.get('/accommodations').then(response => {
      // Display all those places 
      setAccommodations([...response.data, ...response.data, ...response.data, ...response.data]);
    })


  }, []);

  function searchFilter(place) {
    if (searchTerm.toLowerCase() === ''){ 
      //If nothing is typed in SearchBar, then return ALL PLACES 
      return place;
    }  else {
      //Filter the places with address, ONLY display the places that includes the typed searchTerm
      return place.address.toLowerCase().includes(searchTerm.toLowerCase()); 
    }
  }

  return (

    <div >

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />


      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8" >
        {accommodations.length > 0 && accommodations.filter(searchFilter).map(place => (

          <Link to={'/accommodations/' + place._id} className="" key={place.id}>
            
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
            
          </Link>

        ))}

      </div>
    </div>

    
  )
}

export default HomePage