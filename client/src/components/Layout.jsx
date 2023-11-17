import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='px-16 py-8 flex flex-col min-h-screen'>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default Layout