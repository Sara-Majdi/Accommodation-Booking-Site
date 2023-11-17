import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const RegisterPage = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function registerUser(event) {
    event.preventDefault(); // So it would not reload the page
    const userData = {name, email, password};


    axios.post('/register', userData)
    .then(result => {
      console.log(result.data);
      alert('Registration successful. Now you can log in');
    })
    .catch(error => {
      console.log(error);
      alert('Registration failed. Please try again later');
    });

    // try{
    //   const response = await axios.post('/register', userData);
    //   console.log(response.data);
    //   alert('Registration Successful. Now you can log in.');
      
    // } catch (error) {

    //   console.log(error.response.data);
    //   alert('Registration Failed. Please try again later.');
    // }

  }

  return (
    <div className="mt-4 grow flex flex-col items-center justify-center mb-32">
      <h1 className="text-4xl text-center mb-4">Register</h1>
      <form className="max-w-md mx-auto" onSubmit={registerUser}>
        <input 
          type="text" 
          placeholder="Sara Mai"
          value={name}
          onChange={event => setName(event.target.value)} 
        />
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
          Already a member? <Link to={'/login'} className="underline text-black">Login</Link>
        </div>
        
      </form>
    </div>
  )
}

export default RegisterPage