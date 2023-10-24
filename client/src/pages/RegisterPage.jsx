import { Link } from "react-router-dom"

const RegisterPage = () => {
  return (
    <div className="mt-4 grow flex flex-col items-center justify-center mb-32">
      <h1 className="text-4xl text-center mb-4">Register</h1>
      <form className="max-w-md mx-auto">
        <input type="text" placeholder="Sara Mai" />
        <input type="email" placeholder="Your@email.com" />
        <input type="password" placeholder="Password" />
        <button className="primary text-lg font-bold mt-4">Continue</button>

        <div className="text-center text-gray-500 mt-2">
          Already a member? <Link to={'/login'} className="underline text-black">Login</Link>
        </div>
        
      </form>
    </div>
  )
}

export default RegisterPage