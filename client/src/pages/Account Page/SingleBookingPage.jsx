
import { useParams } from 'react-router-dom';

const SingleBookingPage = () => {

    const {bookingID} = useParams();

  return (
    <div>SingleBookingPage: {bookingID}</div>
  )
}

export default SingleBookingPage