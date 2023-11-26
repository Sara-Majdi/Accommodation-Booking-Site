/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
const AccommodationGallery = ({accommodationsDetails, setShowPhotos}) => {

    return (
        <div className="grid grid-cols-[2fr_1fr_1fr] gap-2 relative">

            <div className="overflow-hidden">
                {accommodationsDetails.addedPhotos?.[0] && (
                    <img
                        onClick={() => setShowPhotos(true)} 
                        src={"http://localhost:4000/uploads/"+ accommodationsDetails.addedPhotos[0]} 
                        alt="Place Pictures"
                        className="rounded-l-2xl h-full w-full cursor-pointer" 
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
                            className=" cursor-pointer h-full" 
                            />
                    )}
                </div>
                <div className="overflow-hidden">
                    {accommodationsDetails.addedPhotos?.[2] && (
                        <img
                            onClick={() => setShowPhotos(true)} 
                            src={"http://localhost:4000/uploads/" + accommodationsDetails.addedPhotos[2]} 
                            alt="Place Pictures"
                            className="cursor-pointer h-full"   
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
                            className="rounded-tr-2xl cursor-pointer h-full" 
                            />
                    )}
                </div>
                <div className="overflow-hidden">
                    {accommodationsDetails.addedPhotos?.[4] && (
                        <img
                            onClick={() => setShowPhotos(true)} 
                            src={"http://localhost:4000/uploads/" + accommodationsDetails.addedPhotos[4]} 
                            alt="Place Pictures"
                            className="rounded-br-2xl cursor-pointer h-full"   
                        />
                    )}
                </div> 
            </div>

            {accommodationsDetails.addedPhotos.length >= 5 && (
                <button onClick={()=> setShowPhotos(true)} className="absolute flex gap-2 items-center px-4 py-2 text-sm rounded-lg bg-white right-2 bottom-2 font-semibold border-4 border-black">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                    </svg>

                    Show More
                </button>
            )}

            
        </div>
    )
}

export default AccommodationGallery