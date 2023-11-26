import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom";
import axios from 'axios';
import SearchBar from "../components/SearchBar";
import { UserContext } from '../UserContext';

const HomePage = () => {

  const {user} = useContext(UserContext);

  // Initialize all States 
  const [searchTerm, setSearchTerm] = useState('');
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => { 
    //Get the places that are added in the database
    axios.get('/all-accommodations').then(response => {
      // Display all those places 
      setAccommodations([...response.data]);
    })


  }, []);

  function searchFilter(place) {
    if (searchTerm.toLowerCase() === ''){ 
      //If nothing is typed in SearchBar, then return nothing 
      return place;
    }  else {
      //Filter the places with address, ONLY display the places that includes the typed searchTerm
      return place.address.toLowerCase().includes(searchTerm.toLowerCase()); 
    }
  }

  return (

    <div >

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />


      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-6 gap-x-6 gap-y-10" >
        {accommodations.length > 0 && accommodations.filter(searchFilter).map(place => (

          <Link to={user?'/accommodations/' + place._id:'/login'} className="" key={place.id}>
            
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
              <p><span className="font-bold">RM{place.price.toLocaleString()}</span> per night</p>
            </div>
            
          </Link>

        ))}

      </div>
    </div>

    
  )
}

export default HomePage