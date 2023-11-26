import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import BookingWidget from "../components/BookingWidget";
import AccommodationGallery from "../components/AccommodationGallery";
import AccommodationTitleAndAddress from "../components/AccommodationTitleAndAddress";
import DisplaySelectedPerks from "../components/DisplaySelectedPerks";


const SingleAccommodationPage = () => {

    const {placeID} = useParams();
    const [accommodationsDetails, setAccommodationsDetails] = useState(null);
    const [showPhotos, setShowPhotos] = useState(false);
    
    useEffect(() => {

        if (!placeID){
            return;
        }else {
            axios.get('/accommodations/'+placeID)
            .then(response => setAccommodationsDetails(response.data));
        }

    }, [placeID]);

    if (!accommodationsDetails){
        return;
    }


    if (showPhotos) {
        return (
            <div className="inset-0 absolute bg-black min-h-screen">
                
                <div className="py-10 px-20 bg-black grid gap-4 min-h-screen">
                    <h2 className="text-white mb-2 text-3xl leading-10 font-semibold mr-28         ">{accommodationsDetails.title}</h2>

                    <button 
                        onClick={() => setShowPhotos(false)} 
                        className="text-white flex gap-1 items-center bg-black border-4 border-white font-semibold px-4 py-2 rounded-lg fixed right-20"
                    >

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        Close
                    </button>

                    {accommodationsDetails?.addedPhotos?.length > 0 && accommodationsDetails.addedPhotos.map(photo => (

                        <div key={photo.id} className="grid place-items-center">
                            <img 
                                src={"http://localhost:4000/uploads/" + photo} 
                                alt="Place Picture" 
                                className="object-cover w-full"
                            />
                        </div>

                    ))}
                </div>
            </div>
        )
    }

  return (
    <div className="mt-12 bg-gray-100 py-10 px-5 md:px-10 rounded-md border border-gray-300">

        {!showPhotos && (
            <div>

                {/*ACCOMMODATION TITLE & ADDRESS */}
                < AccommodationTitleAndAddress accommodationsDetails={accommodationsDetails} />

                {/*ACCOMMODATION PICTURES */}
                < AccommodationGallery accommodationsDetails={accommodationsDetails} setShowPhotos={setShowPhotos} />

                {/*ACCOMMODATION PERKS */}
                < DisplaySelectedPerks accommodationsDetails={accommodationsDetails} />

                {/*ACCOMMODATION DESCRIPTION */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold">Description</h2>
                    <p className="text-sm text-justify mt-2 whitespace-pre-line">{accommodationsDetails.description}</p>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 lg:gap-14 ">
                    
                    {/*ACCOMMODATION EXTRA INFO */}
                    <div className="mt-8 lg:mt-10">
                        <h2 className="text-2xl font-semibold">Extra Info</h2>
                        <p className="text-sm text-justify mt-2 whitespace-pre-line">{accommodationsDetails.extraInfo}</p>
                    </div>

                    
                    <div className="mt-8 lg:mt-10 grid self-start gap-8">
                        {/*ACCOMMODATION BOOKING DETAILS */}
                        <div className="">
                            <h2 className="text-2xl font-semibold mb-2">Booking Details</h2>
                            <p className="text-sm text-justify font-medium mb-1">Check In Time: <span className="font-normal">{accommodationsDetails.checkInTime}</span></p>
                            <p className="text-sm text-justify font-medium mb-1">Check Out Time: <span className="font-normal">{accommodationsDetails.checkOutTime}</span></p>
                            <p className="text-sm text-justify font-medium mb-1">Maximum Number of Guests: <span className="font-normal">{accommodationsDetails.maxGuests}</span></p>
                        </div>

                        {/*BOOKING WIDGET */}
                        < BookingWidget accommodationsDetails={accommodationsDetails} />
                    </div>
                </div>

            </div>
        )}
    </div>
  )
}

export default SingleAccommodationPage