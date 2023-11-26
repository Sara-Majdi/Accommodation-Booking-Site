/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';


const DeleteBookingWidget = ({booking}) => {

    const {bookingID} = useParams();
    const [redirect, setRedirect] = useState(false);

    async function deleteBooking(event) {

        if (bookingID) {
            event.preventDefault(); // So it would not reload the page
            if(window.confirm('Are You Sure You Want To Delete Your Booking?')){
                await axios.delete(`/bookings/${bookingID}`);
                alert('You Have Successfully Deleted Your Booking');
                setRedirect(true);
            }
        }
        
    }

    if (redirect) {
        return <Navigate to={'/account/bookings'} />
    }

    return (
        <div className='mt-4 px-4 pt-4 bg-white rounded-2xl shadow-md shadow-gray-500'>
            <h1 className="text-2xl py-2 text-center font-semibold ">RM{booking.accommodation.price}<span className="font-normal text-xl"> per night</span></h1>
            
            <div className='mt-4 border border-gray-300 rounded-2xl px-3 py-8'>
            <div className="flex justify-between px-2">
                <p className="font-normal text-xl underline mr-4">Guest Name</p>
                <p className="font-semibold text-xl ">{booking.guestsName}</p>
            </div>

            <div className="flex justify-between mt-4 px-2">
                <p className="font-normal text-xl underline mr-4">Guest Phone Number</p>
                <p className="font-semibold text-xl  ">{booking.guestsPhoneNum}</p>
            </div>

            <div className="flex justify-between mt-4 px-2">
                <p className="font-normal text-xl underline mr-8">Number Of Guests</p>
                <p className="font-semibold text-xl  ">{booking.guestsNum}</p>
            </div>

            <div className="flex justify-between mt-4 px-2">
                <p className="font-normal text-xl underline mr-4 whitespace-pre-wrap">RM{booking.accommodation.price.toLocaleString()} x {booking.numOfNights} Nights</p>
                <p className="font-semibold text-xl  ">RM{booking.accommodationPriceForNumOfNights.toLocaleString()}</p>
            </div>

            <div className="flex justify-between mt-4 px-2">
                <p className="font-normal text-xl underline mr-4">SM Booking Service Fee</p>
                <p className="font-semibold text-xl  ">RM{booking.serviceFee.toLocaleString()}</p>
            </div>

            </div>

            <div className="flex justify-between my-6 pt-8 border-t border-gray-300">
                <p className="font-bold text-xl ">Total Price</p>
                <p className="font-bold text-xl ">RM{booking.totalPrice.toLocaleString()}</p>
            </div>

            <button onClick={deleteBooking} className="primary mb-8 text-xl  text-white font-bold">Delete Booking</button>
        </div>
    )
}

export default DeleteBookingWidget