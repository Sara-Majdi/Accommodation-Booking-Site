/* eslint-disable react/prop-types */

import { useState } from "react";
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';
import { Navigate } from "react-router-dom";

const BookingWidget = ({accommodationsDetails}) => {

    const [checkInTime, setCheckInTime] = useState('');
    const [checkOutTime, setCheckOutTime] = useState('');
    const [guestsNum, setGuestsNum] = useState(1);
    const [guestsName, setGuestsName] = useState('');
    const [guestsPhoneNum, setGuestsPhoneNum] = useState("");
    const [redirect, setRedirect] = useState('');

    let numOfNights = differenceInCalendarDays(new Date(checkOutTime), new Date(checkInTime));
    let accommodationPrice = 0;
    let serviceFee = 0;
    let totalPrice = 0;
    // console.log(numOfNights)

    if (numOfNights <= 0){
        alert('Please Fill In Correct Dates');
    } else {
        //Price of the place for the selected nights
        accommodationPrice = (numOfNights * accommodationsDetails.price); 
        //Service Fee of this booking website, which is 2.5% of the total price
        serviceFee = Math.round((numOfNights * accommodationsDetails.price)*0.025);
        //Total price, including price for the selected nights, as well as the Service Fee
        totalPrice = accommodationPrice + serviceFee;
    }

    async function bookAccommodation () {
        const bookingData = {
            checkInTime, 
            checkOutTime, guestsNum, 
            guestsName, guestsPhoneNum, totalPrice,
            accommodationID : accommodationsDetails._id,
        };

        if (!guestsName){
            alert('Please Fill In Your Name');
        } else if (!guestsPhoneNum){
            alert('Please Fill In Your Phone Number');
        }
        else {
            const response = await axios.post('/bookings', bookingData);
            const bookingID = response.data._id;
            setRedirect('/account/bookings/' + bookingID);
        }
        
        
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }
    

  return (
    <div className="mt-4 px-4 pt-4 bg-white rounded-2xl shadow-md shadow-gray-500">
        <h1 className="text-2xl py-2 text-center font-semibold mb-2">RM{accommodationsDetails.price}<span className="font-normal text-xl"> per night</span></h1>
        
        <div className="border rounded-2xl">
            <div className="flex justify-evenly">
                <div className="px-4 py-3 border-r w-full">
                    <label className="font-medium">Check In: </label>
                    <input type="date" value={checkInTime} onChange={(event) => setCheckInTime(event.target.value)} />
                </div>
                <div className="px-4 py-3 w-full">
                    <label className="font-medium">Check Out: </label>
                    <input type="date" value={checkOutTime} onChange={(event) => setCheckOutTime(event.target.value)} />
                </div>
            </div>
            
            <div className="px-4 py-2 w-full border-t">
                <label className="font-medium">Number of Guests: </label>
                <input type="number" value={guestsNum} onChange={(event) => setGuestsNum(event.target.value)} className="booking-widget-inputs" />
            </div>

            {numOfNights > 0 && (
                <div>
                    <div className="px-4 py-2 w-full border-t">
                        <label className="font-medium">Name: </label>
                        <input type="text" value={guestsName} onChange={(event) => setGuestsName(event.target.value)} className="booking-widget-inputs" />
                    </div>

                    <div className="px-4 pt-2 pb-4  w-full border-t">
                        <label className="font-medium">Phone Number: </label>
                        <input type="tel" value={guestsPhoneNum} onChange={(event) => setGuestsPhoneNum(event.target.value)} className="booking-widget-inputs" />
                    </div>
                </div>
                
            )}

        </div>

        <button onClick={bookAccommodation} className="primary mt-4 mb-8 text-xl  text-white font-bold">Book</button>

        
            {numOfNights > 0 &&  (
                <div>
                    <div className="flex justify-between px-2">
                        <p className="font-normal text-xl underline">RM{accommodationsDetails.price.toLocaleString()} x {numOfNights} Nights</p>
                        <p className="font-medium text-xl ">RM{accommodationPrice.toLocaleString()}</p>
                    </div>

                    <div className="flex justify-between mt-4 px-2">
                        <p className="font-normal text-xl underline">MeshBnB Service Fee</p>
                        <p className="font-medium text-xl ">RM{serviceFee.toLocaleString()}</p>
                    </div>

                    <div className="flex justify-between mt-8 py-8 border-t border-gray-300">
                        <p className="font-bold text-xl ">Total Price</p>
                        <p className="font-bold text-xl ">RM{totalPrice.toLocaleString()}</p>
                    </div>

            </div>

            )}
        
        
    </div>
  )
}

export default BookingWidget