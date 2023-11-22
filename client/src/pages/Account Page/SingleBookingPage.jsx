import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import AccountPageNavbar from '../../components/AccountPageNavbar';
import AccommodationTitleAndAddress from '../../components/AccommodationTitleAndAddress';
import AccommodationGallery from '../../components/AccommodationGallery';
import BookingWidget from "../../components/BookingWidget";
import BookingDates from '../../components/BookingDates';

const SingleBookingPage = () => {

  const {bookingID} = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(()=> {
    axios.get('/bookings').then(result => {
      const bookingDetails = result.data.find(({_id}) => _id === bookingID);
      if (bookingDetails){
        setBooking(bookingDetails);
      }
    })

  }, [bookingID]);

  if(!booking){
    return '';
  }


  return (
    <div className=''>
        < AccountPageNavbar />

        <div className='mt-10 md:mt-16 bg-gray-100 py-10 px-5 md:px-10 rounded-md border border-gray-300'>
          {/*ACCOMMODATION TITLE & ADDRESS */}
          < AccommodationTitleAndAddress accommodationsDetails={booking.accommodation}/>

          {/*BOOKING DETAILS */}
          <div className="mb-8 mt-2 border-2 border-black flex px-8 py-3 bg-white rounded-2xl justify-between">
            <div className='mt-4'>
              <h1 className='text-2xl mb-6 font-semibold mr-4'>Your Booking Information:</h1>
              <BookingDates booking={booking} />
            </div>

            <div className='bg-primary text-white rounded-2xl p-4 self-center text-center'>
              <p className='text-lg font-semibold'>Total Price:</p>
              <p className='font-bold text-2xl'>RM{(booking.totalPrice).toLocaleString()}</p>
            </div>
          </div>

          {/*ACCOMMODATION PICTURES */}
          < AccommodationGallery accommodationsDetails={booking.accommodation}/>

          {/*ACCOMMODATION DESCRIPTION */}
          <div className="mt-8">
              <h2 className="text-2xl font-semibold">Description</h2>
              <p className="text-sm text-justify mt-2 whitespace-pre-line">{booking.accommodation.description}</p>
          </div>

        
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 lg:gap-14 ">
      
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

                {/*BOOKING WIDGET */}
                < BookingWidget accommodationsDetails={booking.accommodation} />

              </div>
          </div>

        </div>
        
        
    </div>
  )
}

export default SingleBookingPage