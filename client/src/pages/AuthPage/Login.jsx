import { NavLink } from "react-router-dom"
import Input from "./components/Input"
import { Logo } from "components"

const LoginPage = () => {
  return (
    <>
        <h1 className='text-2xl font-bold uppercase p-4'>
            <Logo />
        </h1>
        
        <div className="container flex min-h-full flex-col items-center justify-center px-2 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <Input id="email" type="email" />
                        </div>
                    </div>

                <div className="flex flex-col ">
                    <div className="m">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    </div>
                    <div className="mt-2">
                        <Input id="email" type="password" />
                    </div>
                </div>

                <div>
                    <button type="submit" 
                        className="flex w-96 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Here for the first time?
                    <NavLink to="/register" className="font-semibold mx-1 leading-6 text-indigo-600 hover:text-indigo-500">
                        Register
                    </NavLink>
                </p>
            </div>
        </div>
    </>
  )
}

export default LoginPage