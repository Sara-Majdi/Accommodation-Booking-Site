import { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom'
import axios from 'axios'

const AccountPage = () => {
  const [redirect, setRedirect] = useState(null);
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
  

  function linkClasses(type=null) {
    let classes = 'py-2 px-4 font-semibold';

    if (type === subpage){
      classes += ' bg-primary rounded-full text-white'
    }

    return classes;
  }

  async function logout () {
    await axios.post('/logout');
    setUser(null);
    setRedirect('/'); 
  }


  return (
    <div>
      <nav className="w-full flex mt-8 gap-4 justify-center mb-6">
        <Link to={'/account'} className={linkClasses('profile')} >My Profile</Link>
        <Link to={'/account/bookings'} className={linkClasses('bookings')} >My Bookings</Link>
        <Link to={'/account/accommodations'} className={linkClasses('accommodations')} >My Accommodations</Link>
      </nav>

      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) <br />
          <button onClick={logout} className='primary font-bold max-w-md mt-4'>Logout</button>
        </div>
      )}

    </div>
  )
}

export default AccountPage