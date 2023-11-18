import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import BookingWidget from "../components/BookingWidget";


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
            <div className="min-h-screen inset-0 absolute bg-black">
                
                <div className="py-10 px-20 bg-black grid gap-4">
                    <h2 className="text-white mb-2 text-3xl leading-10 font-semibold mr-28">{accommodationsDetails.title}</h2>

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
    // (Add this after this page is completed)
    <div className="mt-12 bg-gray-100 p-10 rounded-md border border-gray-300">

        {/*ACCOMMODATION TITLE */}
        <h1 className="mb-3 text-3xl leading-10 font-semibold">{accommodationsDetails.title}</h1>

        {/*ACCOMMODATION ADDRESS */}
        <a 
            href={"https://maps.google.com/?q=" + accommodationsDetails.address} 
            target="_blank" 
            className="font-semibold underline mb-6 gap-1 inline-flex" 
            rel="noreferrer"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>

            {accommodationsDetails.address}
        </a>

        {/*ACCOMMODATION PICTURES */}
        <div className="grid grid-cols-[2fr_1fr_1fr] gap-2 relative">

            <div className="">
                {accommodationsDetails.addedPhotos?.[0] && (
                    <img
                        onClick={() => setShowPhotos(true)} 
                        src={"http://localhost:4000/uploads/"+ accommodationsDetails.addedPhotos[0]} 
                        alt="Place Pictures"
                        className="rounded-l-2xl h-full cursor-pointer" 
                    />
                )} 
            </div>

            <div className="grid gap-2">
                <div className="overflow-hidden">
                    {accommodationsDetails.addedPhotos?.[1] && (
                        <img
                            onClick={() => setShowPhotos(true)} 
                            src={"http://localhost:4000/uploads/" + accommodationsDetails.addedPhotos[1]} 
                            alt="Place Pictures"
                            className=" cursor-pointer" 
                         />
                    )}
                </div>
                <div className="overflow-hidden">
                    {accommodationsDetails.addedPhotos?.[2] && (
                        <img
                            onClick={() => setShowPhotos(true)} 
                            src={"http://localhost:4000/uploads/" + accommodationsDetails.addedPhotos[2]} 
                            alt="Place Pictures"
                            className="cursor-pointer"   
                        />
                    )}
                </div> 
            </div>

            <div className="grid gap-2">
                <div className="overflow-hidden">
                    {accommodationsDetails.addedPhotos?.[3] && (
                        <img
                            onClick={() => setShowPhotos(true)} 
                            src={"http://localhost:4000/uploads/" + accommodationsDetails.addedPhotos[3]} 
                            alt="Place Pictures"
                            className="rounded-tr-2xl cursor-pointer" 
                         />
                    )}
                </div>
                <div className="overflow-hidden">
                    {accommodationsDetails.addedPhotos?.[4] && (
                        <img
                            onClick={() => setShowPhotos(true)} 
                            src={"http://localhost:4000/uploads/" + accommodationsDetails.addedPhotos[4]} 
                            alt="Place Pictures"
                            className="rounded-br-2xl cursor-pointer"   
                        />
                    )}
                </div> 
            </div>

            <button onClick={()=> setShowPhotos(true)} className="absolute flex gap-2 items-center px-4 py-2 text-sm rounded-lg bg-white right-2 bottom-2 font-semibold border-4 border-black">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                </svg>

                Show More
            </button>
        </div>

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