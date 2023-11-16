import {useEffect, useState} from 'react';
import axios from 'axios';
import Perks from '../../components/Account Page/MyAccommodation Page/Perks';
import AccountPageNavbar from '../../components/Account Page/AccountPageNavbar';
import { Navigate, useParams } from 'react-router-dom';

const MyAccommodationFormPage = () => {

    // Initialize all States and Params
    const {placeID} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkInTime, setCheckInTime] = useState('');
    const [checkOutTime, setCheckOutTime] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(1);
    const [redirect, setRedirect] = useState(false); 
    useEffect(() => {

        if (!placeID){ //If User clicked on the 'Add New Button', then  this Form page will be displayed
            return;
        }

        //Getting the data from Database, where users can Edit the details
        //If the page is refreshed, the ORIGINAL data will still remain (Since its from the database) 
        //If Users did not click on the 'Save' button, then the data will not be changed 
        axios.get('/accommodations/' + placeID).then(response => {
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.addedPhotos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckInTime(data.checkInTime);
            setCheckOutTime(data.checkOutTime);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        });
    }, [placeID]);

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

    function deletePhoto(event, photoLink) {
        event.preventDefault(); // So it would not reload the page
        setAddedPhotos([...addedPhotos.filter(photoName => photoName !== photoLink)])
    }

    function setMainPhoto(event, photoLink) {
        event.preventDefault(); // So it would not reload the page
        // The other photos that are not the main photos will be assigned to the 'notMainPhotos' array
        const notMainPhotos = [...addedPhotos.filter(photoName => photoName !== photoLink)]; 
        setAddedPhotos([photoLink, ...notMainPhotos]); //Set the picture that is 'Hearted' as the first/main picture
    }

   async function savePlace (event) {
        event.preventDefault(); // So it would not reload the page
        const accommodationData = {
            title, address, addedPhotos, 
            description, perks, extraInfo,
            checkInTime, checkOutTime, maxGuests, price
        };
        
        if(placeID) {
            //If there is a PlaceID, then Update
            await axios.put('/accommodations', {placeID, ...accommodationData});
            setRedirect(true);
        } else{
            ////If there is no PlaceID, then Add New Place
            await axios.post('/accommodations', accommodationData);
            setRedirect(true);
        }
   }

   if (redirect) {
        return <Navigate to={'/account/accommodations'} />
   }

  return (
    <div >
        <AccountPageNavbar /> {/*Importing Nav Links*/}

        <form onSubmit={savePlace} >

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
                    <div key={photosLink} className='h-32 flex relative'>
                        <img className='rounded-2xl cursor-pointer w-full object-cover' src={'http://localhost:4000/uploads/' + photosLink} alt="room image" />
                        <button onClick={event => deletePhoto(event, photosLink)} className="absolute bottom-1 right-1 text-white bg-black py-2 px-2 bg-opacity-70 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                        
                        <button onClick={event => setMainPhoto(event, photosLink)} className="absolute bottom-1 left-1 text-white bg-black py-2 px-2 bg-opacity-70 rounded-full">
                            {photosLink === addedPhotos[0] && (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                </svg>
                            )}
                            {photosLink !== addedPhotos[0] && (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                            )}
                        </button>
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mx-2 my-4">
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
            <button className='primary font-bold mt-2'>
                Save
            </button>
        
        </form>
    </div>
  )
}

export default MyAccommodationFormPage