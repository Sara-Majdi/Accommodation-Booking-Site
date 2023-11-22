import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import BookingWidget from "../components/BookingWidget";
import AccommodationGallery from "../components/AccommodationGallery";
import AccommodationTitleAndAddress from "../components/AccommodationTitleAndAddress";


const SingleAccommodationPage = () => {

    const {placeID} = useParams();
    const [accommodationsDetails, setAccommodationsDetails] = useState(null);
    
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

  return (
    <div className="mt-12 bg-gray-100 py-10 px-5 md:px-10 rounded-md border border-gray-300">

        {/*ACCOMMODATION TITLE & ADDRESS */}
        < AccommodationTitleAndAddress accommodationsDetails={accommodationsDetails} />

        {/*ACCOMMODATION PICTURES */}
        < AccommodationGallery accommodationsDetails={accommodationsDetails} />

        {/*ACCOMMODATION DESCRIPTION */}
        <div className="mt-8">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="text-sm text-justify mt-2 whitespace-pre-line">{accommodationsDetails.description}</p>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 lg:gap-14 ">
            
    
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
  )
}

export default SingleAccommodationPage