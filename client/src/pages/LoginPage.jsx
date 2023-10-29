import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function userLogin (event) {

    event.preventDefault(); // So it would not reload the page

    try {
      await axios.post('/login', {email, password});
      alert('Login Successful');
      setRedirect(true);


    } catch (e){
      alert('Login Failed');
    }
  }

  if(redirect) {
    return <Navigate to={'/'} />
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
          Don't have an account yet? <Link to={'/register'} className="underline text-black">Register now</Link>
        </div>
        
      </form>
    </div>
  )
}

export default LoginPage