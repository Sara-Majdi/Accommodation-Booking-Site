import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import ProfilePage from './pages/Account Page/MyProfilePage';
import MyAccommodation from './pages/Account Page/MyAccommodation';
import MyAccommodationFormPage from './pages/Account Page/MyAccommodationFormPage';
import MyBookingsPage from './pages/Account Page/MyBookingsPage';
import SingleAccommodationPage from './pages/SingleAccommodationPage';


axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true; 

function App() {

  return (
    <UserContextProvider>
      <Routes> 
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account' element={<ProfilePage />} />
          <Route path='/account/bookings' element={<MyBookingsPage />} />
          <Route path='/account/accommodations' element={<MyAccommodation />} />
          <Route path='/account/accommodations/new' element={<MyAccommodationFormPage />} />
          <Route path='/account/accommodations/:placeID' element={<MyAccommodationFormPage />} />
          <Route path='/accommodations/:placeID' element={<SingleAccommodationPage />} />
        </Route>

      </Routes>
    </UserContextProvider>
  )
}

export default App
