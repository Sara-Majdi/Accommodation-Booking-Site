import { Link } from "react-router-dom"

const LoginPage = () => {
  return (
    <div className="mt-4 grow flex flex-col items-center justify-center mb-32">
      <h1 className="text-4xl text-center mb-4">Login</h1>
      <form className="max-w-md mx-auto">
        <input type="email" placeholder="Your@email.com" />
        <input type="password" placeholder="Password" />
        <button className="primary text-lg font-bold mt-4">Continue</button>

        <div className="text-center text-gray-500 mt-2">
          Don't have an account yet? <Link to={'/register'} className="underline text-black">Register now</Link>
        </div>
        
      </form>
    </div>
  )
}

export default LoginPage