import { useEffect, useState } from 'react';
import AccountPageNavbar from '../../components/AccountPageNavbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookingDates from '../../components/BookingDates';

const MyBookingsPage = () => {

  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get('/bookings').then(response=> setBookings(response.data));
  }, [])


  return (
    <div>
      <AccountPageNavbar />
      
      <div className='mt-16'>
        {bookings?.length <= 0 && (
          <div>
            <p className='text-center text-2xl font-semibold'>You Have Not Made Any Booking</p>
            <p className='text-center mt-5 text-lg'>If The Booking You Have Made Is Not Displayed, It Indicates The Accommodation Owner Has Removed The Listing. </p>
          </div>
        )}
      </div>

      <div className="mt-16">

        {bookings?.length > 0 && (

          <div className=''>

            <div>
              {bookings.filter(booking => booking.accommodation?._id !== undefined).map(booking => (

                <Link to={`/account/bookings/${booking._id}`} key={booking.title} 
                  className='flex gap-2 md:gap-5 bg-gray-100 border border-gray-300 rounded-2xl overflow-hidden mt-4'
                >
                  <div className="md:w-80 w-48 shrink-0">
                    {booking?.accommodation?.addedPhotos?.[0] && (
                      <img
                        src={"http://localhost:4000/uploads/"+ booking?.accommodation?.addedPhotos[0]} 
                        alt="Place Pictures"
                        className="h-full object-cover" 
                      />
                    )} 
                  </div>

                  <div className=' py-4 grid grid-rows-1 gap-4'>
                    <div>
                      {/*ACCOMMODATION TITLE */}
                      <h1 className='font-semibold text-2xl mb-3 whitespace-pre-wrap'>{booking?.accommodation?.title}</h1>

                      {/*BOOKING DATES INFO */}
                      <BookingDates booking={booking} />
                    </div>
                    
                    {/*TOTAL PRICE OF THE BOOKING */}
                    <div className=''>
                      <h1 className='text-lg font-semibold flex gap-1 items-center mb-1'> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                        </svg>

                        Total Price:
                      </h1>

                      <h1 className='text-2xl font-bold'>RM{(booking.totalPrice).toLocaleString()}</h1>
                    </div>
                  </div>

                </Link>
                ))}
            </div>

            <div>
              {bookings?.length > 0 && bookings.filter(booking => booking.accommodation?._id === undefined).map(booking => (
                <Link to={`/account/bookings/${booking._id}`} key={booking._id} className='flex gap-2 md:gap-5 p-4  bg-gray-100 border border-gray-300 rounded-2xl overflow-hidden mt-4'>

                  <div  className='md:w-80 w-48 object-center'>
                    <img 
                      className='h-full object-cover object-center' 
                      src="https://i.pinimg.com/originals/2b/71/de/2b71de7c996e4b3e6297342eab770539.gif" 
                      alt="Sorry Picture" 
                    />
                  </div>

                  <div className='flex items-center justify-center text-center w-full mr-12 xl:mr-60'>
                    <h1 className='text-xl sm:text-2xl text-center font-bold'>The Accommodation Hosted Has Been Removed By The Owner</h1>
                  </div>

                  <div className='text-white bg-primary p-2 rounded-md h-10 mr-2 cursor-pointer' >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-6 h-6 font-bold">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>

                  </div>

                </Link>
                
              ))}
            </div>
            
            <p className='text-center mt-5 text-lg'>If The Booking You Have Made Is Not Displayed, It Indicates The Accommodation Owner Has Removed The Listing. </p>
          
          </div>
          
        )}
      </div>
    </div>
  )
}

export default MyBookingsPage