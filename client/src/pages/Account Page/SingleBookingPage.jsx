import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import AccountPageNavbar from '../../components/AccountPageNavbar';
import AccommodationTitleAndAddress from '../../components/AccommodationTitleAndAddress';
import AccommodationGallery from '../../components/AccommodationGallery';
import BookingDates from '../../components/BookingDates';
import DisplaySelectedPerks from '../../components/DisplaySelectedPerks';
import DeleteBookingWidget from '../../components/DeleteBookingWidget';

const SingleBookingPage = () => {

  const {bookingID} = useParams();
  const [booking, setBooking] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);

  useEffect(()=> {
    axios.get('/bookings').then(result => {
      const bookingDetails = result.data[1].find(({_id}) => _id === bookingID);
      if (bookingDetails){
        setBooking(bookingDetails);
      }
    })

  }, [bookingID]);

  async function handleDelete (event) {
    event.preventDefault(); // So it would not reload the page
    await axios.delete('/bookings/' + bookingID);
    setRedirect(true);
  }

  // Loading Screen 
  if(!booking){
    return '';
  }

  if (showPhotos) {
    return (
        <div className="inset-0 absolute bg-black min-h-screen">
            
            <div className="py-10 px-20 bg-black grid gap-4 min-h-screen">
                <h2 className="text-white mb-2 text-3xl leading-10 font-semibold mr-28         ">{booking?.accommodation?.title}</h2>

                <button 
                    onClick={() => setShowPhotos(false)} 
                    className="text-white flex gap-1 items-center bg-black border-4 border-white font-semibold px-4 py-2 rounded-lg fixed right-20"
                >

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                    Close
                </button>

                {booking?.accommodation?.addedPhotos?.length > 0 && booking?.accommodation?.addedPhotos.map(photo => (

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

  if (redirect){
    return <Navigate to={'/account/bookings'} />
  }

  if(booking?.accommodation?._id === undefined){
    return (
      <div className='flex-col mt-32 mx-auto'>
        <img 
            className='h-full object-cover object-center mx-auto' 
            src="https://i.pinimg.com/originals/2b/71/de/2b71de7c996e4b3e6297342eab770539.gif" 
            alt="Sorry Picture" 
          />
        <p className='text-center text-2xl font-semibold'>The Accommodation Hosted Has Been Removed By The Owner</p>
        <div className='w-3/4 self-center mx-auto'>
          <button onClick={handleDelete} className='primary font-bold text-2xl mt-6'>Delete</button>
        </div>
        
      </div>
    );
  }


  return (
    <div className=''>

      {!showPhotos && (
        <div>
          < AccountPageNavbar />

          <div className='mt-10 md:mt-16 bg-gray-100 py-10 px-5 md:px-10 rounded-md border border-gray-300'>
            {/*ACCOMMODATION TITLE & ADDRESS */}
            < AccommodationTitleAndAddress accommodationsDetails={booking.accommodation}/>

            {/*BOOKING DETAILS */}
            <div className="mb-8 mt-2 border-2 border-black flex px-2 sm:px-8 py-3 bg-white rounded-2xl justify-between">
              <div className='mt-4'>
                <h1 className='text-lg sm:text-2xl mb-6 font-semibold mr-4'>Your Booking Information:</h1>
                <BookingDates booking={booking} />
              </div>

              <div className='bg-primary text-white rounded-xl p-2 sm:p-4 self-center text-center'>
                <p className='sm:text-lg font-semibold'>Total Price:</p>
                <p className='font-bold text-xl sm:text-2xl'>RM{(booking.totalPrice).toLocaleString()}</p>
              </div>
            </div>

            {/*ACCOMMODATION PICTURES */}
            < AccommodationGallery accommodationsDetails={booking.accommodation} setShowPhotos={setShowPhotos}/>


            {/*ACCOMMODATION PERKS */}
            < DisplaySelectedPerks accommodationsDetails={booking.accommodation} />

            {/*ACCOMMODATION DESCRIPTION */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold">Description</h2>
                <p className="text-sm text-justify mt-2 whitespace-pre-line">{booking.accommodation.description}</p>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 lg:gap-14 ">

              {/*ACCOMMODATION EXTRA INFO */}
              <div className="mt-8 lg:mt-10">
                <h2 className="text-2xl font-semibold">Extra Info</h2>
                <p className="text-sm text-justify mt-2 whitespace-pre-line">{booking.accommodation.extraInfo}</p>
              </div>

              
              <div className="mt-8 lg:mt-10 grid self-start gap-8">
                  {/*ACCOMMODATION BOOKING DETAILS */}
                  <div className="">
                    <h2 className="text-2xl font-semibold mb-2">Booking Details</h2>
                    <p className="text-sm text-justify font-medium mb-1">Check In Time: <span className="font-normal">{booking.accommodation.checkInTime}</span></p>
                    <p className="text-sm text-justify font-medium mb-1">Check Out Time: <span className="font-normal">{booking.accommodation.checkOutTime}</span></p>
                    <p className="text-sm text-justify font-medium mb-1">Maximum Number of Guests: <span className="font-normal">{booking.accommodation.maxGuests}</span></p>
                  </div>

                  {/*DELETE BOOKING WIDGET */}
                  < DeleteBookingWidget booking={booking} />

                </div>
            </div>

          </div>
        </div>
      )}
        
    </div>
  )
}

export default SingleBookingPage