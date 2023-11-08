import axios from 'axios';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import Perks from '../components/Perks';

const MyAccommodation = () => {

  // Importing from App.jsx
  const {action} = useParams();

  // Initialize All states 
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState('');
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [maxGuests, setMaxGuests] = useState('');
  const [price, setPrice] = useState('');

  // All Functions 
  async function uploadPhotoByLink (event) {
    event.preventDefault(); // So it would not reload the page
    const {data:filename} = await axios.post('/upload-by-link', {link: photoLink});
    setAddedPhotos(prev => {
        return [...prev, filename]
    });
    setPhotoLink('');
  }

  async function uploadPhotoFromDevice(event) {

    const files = event.target.files;
    const data = new FormData();
    for (let i=0; i<files.length; i++){
        data.append('photos', files[i]);
    }
    const {data:filenames} = await axios.post('/upload-from-device', data, {
        headers: {'Content-type':'multiple/form-data'}
    });
    setAddedPhotos(prev => {
        return [...prev, ...filenames]
    });
  }

  return (
    
    <div>
        {/* Return this screen when user clicked on the 'MyAccommodations' button */}
        {action !== 'new' && (
            <div className='text-center mt-8'>
                <Link to={'/account/accommodations/new'} className='inline-flex bg-primary text-white px-4 py-2 gap-2 rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                    
                    Add New Place
                </Link>
            </div>
        )}

        {/*Return this screen when user click on the 'Add New Place' button */}
        {action === 'new' && (
            <div className=''>
                <form>

                    {/*Title Input Section*/}
                    <h2 className='text-2xl font-semibold  mt-6 ' >Title</h2>
                    <p className='text-sm text-gray-500 m-2'>Title of your place. Tip: should be short and catchy</p>
                    <input 
                        type='text' 
                        placeholder='Title, ex: Golden Triangle Condo with 4 rooms and 3 beds' 
                        value={title}
                        onChange={event => setTitle(event.target.value)} 
                    />

                    {/*Address Input Section*/}
                    <h2 className='text-2xl font-semibold mt-6 ' >Address</h2>
                    <p className='text-sm text-gray-500 m-2'>Address of your place</p>
                    <input 
                        type='text' 
                        placeholder='Address' 
                        value={address}
                        onChange={event => setAddress(event.target.value)} 
                    />

                    {/*Photos Input Section*/}
                    <h2 className='text-2xl font-semibold mt-6' >Photos</h2>
                    <p className='text-sm text-gray-500 m-2'>Phots of your place. Tip: include more pictures</p>
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            placeholder='Add using a link ...jpg'
                            value={photoLink}
                            onChange={event => setPhotoLink(event.target.value)}
                        />
                        <button onClick={uploadPhotoByLink} className='bg-gray-200 font-semibold rounded-2xl px-4 mb-2' >Add&nbsp;Photo</button>
                    </div>
                    <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2' >
                        {addedPhotos.length > 0 && addedPhotos.map((photosLink) => (
                            <div key={photosLink} className='h-32 flex'>
                                <img className='rounded-2xl cursor-pointer w-full object-cover' src={'http://localhost:4000/uploads/' + photosLink} alt="room image" />
                            </div>
                        ))}

                        <label className="flex h-32 cursor-pointer items-center justify-center gap-2 border p-8 rounded-2xl text-2xl" >
                            <input type="file" multiple className='hidden' onChange={uploadPhotoFromDevice} />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                            </svg>

                            
                            Upload
                        </label>
                    </div>
                    
                    {/*Description Input Section*/}
                    <h2 className='text-2xl font-semibold mt-8' >Description</h2>
                    <p className='text-sm text-gray-500 m-2'>Description of your place</p>
                    <textarea  
                        rows={10} 
                        placeholder='Examples: 5 minutes from the airport, Has swimming pool and gym, etc' 
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    />

                    {/*Perks Input Section*/}
                    <h2 className='text-2xl font-semibold mt-6 ' >Perks</h2>
                    <p className='text-sm text-gray-500 m-2'>Select all the perks of your place</p>
                    <Perks selected={perks} onChange={setPerks} />

                    {/*Extra-Info Input Section*/}
                    <h2 className='text-2xl font-semibold mt-8' >Extra Info</h2>
                    <p className='text-sm text-gray-500 m-2'>House Rules, etc</p>
                    <textarea 
                        rows={5} 
                        placeholder='Examples: No smoking, Only up to 6 maximum guests, etc' 
                        value={extraInfo}
                        onChange={event => setExtraInfo(event.target.value)}
                    />

                    {/*Check-In-Details Input Section*/}
                    <h2 className='text-2xl font-semibold mt-6 ' >Booking Details</h2>
                    <p className='text-sm text-gray-500 m-2'>Fill in booking details. Tip: Leave a time window for housekeeping between guests</p>
                    <div className="grid grid-cols-2 gap-2 mx-2 my-4">
                        <div className="font-medium">
                            <h3 className='' >Check In Time</h3>
                            <input 
                                type="text" 
                                placeholder='From 2pm onwards'
                                className='font-normal'
                                value={checkInTime}
                                onChange={event => setCheckInTime(event.target.value)}
                            />
                        </div>
                        <div className="font-medium">
                            <h3 className='' >Check Out Time</h3>
                            <input 
                                type="text" 
                                placeholder='Before 12pm' 
                                className='font-normal'
                                value={checkOutTime}
                                onChange={event => setCheckOutTime(event.target.value)}
                            />
                        </div>
                        <div className="font-medium">
                            <h3 className='' >Max Number of Guests</h3>
                            <input 
                                type="number" 
                                placeholder='Less than 10'
                                className='font-normal'
                                value={maxGuests}
                                onChange={event => setMaxGuests(event.target.value)}
                            />
                        </div>
                        <div className="font-medium">
                            <h3 className='' >Price</h3>
                            <input 
                                type="number" 
                                placeholder='RM 500' 
                                className='font-normal'
                                value={price}
                                onChange={event => setPrice(event.target.value)}
                            />
                        </div>
                    </div>
                    <button className='primary font-bold mt-6'>
                        Save
                    </button>
                
                </form>
            </div>
        )}
    </div>
  )
}

export default MyAccommodation