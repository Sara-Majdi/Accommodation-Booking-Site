import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='md:px-16 px-6 py-8 flex flex-col min-h-screen'>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default Layout