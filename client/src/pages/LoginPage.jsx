import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useContext } from "react";
import { UserContext } from "../UserContext";

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const {setUser} = useContext(UserContext);

  async function userLogin (event) {

    event.preventDefault(); // So it would not reload the page

    try {
      const userInfo = await axios.post('/login', {email, password});
      setUser(userInfo);
      alert('Login Successful');
      setLoggedIn(true);

    } catch (e){
      alert('Login Failed');
    }
  }

  if(isLoggedIn) {
    return window.location.replace('/'); // Redirects to Home Page
  }

  return (
    <div className="mt-4 grow flex flex-col items-center justify-center mb-32">
      <h1 className="text-4xl text-center mb-4">Login</h1>
      <form className="max-w-md mx-auto" onSubmit={userLogin}>
        <input 
          type="email" 
          placeholder="Your@email.com" 
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        <button className="primary text-lg font-bold mt-4">Continue</button>

        <div className="text-center text-gray-500 mt-2">
          Don&apos;t have an account yet? <Link to={'/register'} className="underline text-black">Register now</Link>
        </div>
        
      </form>
    </div>
  )
}

export default LoginPage