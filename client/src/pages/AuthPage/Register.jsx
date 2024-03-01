import { NavLink } from "react-router-dom"
import { Logo } from "components"
import { useState } from "react"
import { useAxios } from "hooks"
import Input from "./components/Input"
import { Spinner } from 'react-bootstrap'

const Register = () => {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    async function handleRegister(event){
        event.preventDefault();
        const payload = {
            name,
            email,
            password
        }
        const {data, loading, error, status_code} = useAxios({
            url: "/api/register/",
            payload: payload,
            method: "POST"
        })
        setLoading(loading);
        setError(error)
    }

    return (
    <>
        <h1 className='text-2xl font-bold uppercase p-4'>
            <Logo />
        </h1>
        
        <div className="container flex min-h-full flex-col items-center justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mb-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Create new account
                </h2>
            </div>

            <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleRegister}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Your Full Name</label>
                        <div className="mt-2">
                        <Input 
                            id="name" 
                            type="text" 
                            value={name} 
                            onChange={(e) => { setName(e.target.value) }} />
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                        <Input 
                            id="email" 
                            type="email"
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                            />
                        </div>
                    </div>

                <div className="flex flex-col ">
                    <div className="m">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    </div>
                    <div className="mt-2">
                        <Input 
                            id="email" 
                            type="password"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                            />
                    </div>
                </div>

                {/* Spinner */}
                <div className="flex justify-center">
                    {loading && <Spinner className="text-slate-900" />}
                </div>

                {/* Error */}

                <div>
                    <button type="submit" 
                        className="flex w-96 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Register
                        </button>
                </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Existing User?
                    <NavLink to="/login" className="font-semibold mx-1 leading-6 text-indigo-600 hover:text-indigo-500">
                        Login
                    </NavLink>
                </p>
            </div>
        </div>
    </>
  )
}

export default Register