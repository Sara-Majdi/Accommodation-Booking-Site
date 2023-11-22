import { useContext, useState } from 'react';
import { UserContext } from '../../UserContext';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import MyAccommodation from './MyAccommodation';
import AccountPageNavbar from '../../components/AccountPageNavbar';
import MyBookingsPage from './MyBookingsPage';

const ProfilePage = () => {
  const [redirect, setRedirect] = useState(false);
  const {ready, user, setUser} = useContext(UserContext);
  let {subpage} = useParams();

  if (subpage === undefined) {
    subpage = 'profile';
  }

  if (!ready){
    return 'Loading...';
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }
  

  async function logout () {
    await axios.post('/logout');
    setUser(null);
    setRedirect(true); 
  }

  if (redirect){
    return <Navigate to={'/'} />
  }


  return (
    <div>
      <AccountPageNavbar />

      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto mt-8">
          Logged in as <span className='font-bold'>{user.name}</span> <span className='font-bold'>({user.email})</span> <br />
          <button onClick={logout} className='primary font-bold max-w-md mt-4'>Logout</button>
        </div>
      )}

      {subpage === 'bookings' && (
        <MyBookingsPage />
      )}

      {subpage === 'accommodations' && (
        <MyAccommodation />
      )}

    </div>
  )
}

export default ProfilePage