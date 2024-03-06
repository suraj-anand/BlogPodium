import { Button, Img, Text } from "components"
import { Link } from "react-router-dom"
import Greet from "./Greet"
import { useContext } from "react"
import { AuthContext } from "context/AuthContext"

const HomeSection = () => {
    const { authStatus } = useContext(AuthContext)
    return (
    <>
    <div className="flex flex-col justify-center min-h-[84vh]">
        
        <div className="container flex gap-32 justify-evenly">
            <Img src="assets/img_brand_1.svg" alt="brandone_one" />
            <Img src="assets/img_blog_1.svg" alt="blogone_one"  />
        </div>

        <div className="px-10 flex flex-col justify-center align-center mx-auto">
            <div className="flex justify-center">
                {
                    authStatus ?
                    <Greet />
                    :
                    <p className="text-center text-[48px] fw-bold text-gray-600_01">
                        Social Media for <span className="text-gray-600">Blogs</span> and <span className="text-blue_gray-600">Podcasts</span>
                    </p>
                }
            </div>
            
            <div className="flex justify-center">
                <p className=" fs-4 text-center leading-[35px] my-4 w-[60%]">
                    Increase your knowledge by reading new things and listening new things. 
                    Share your voice & thoughts to the world.
                </p>
            </div>
        </div>
        
        {
            !authStatus &&
            <div className="flex flex-row gap-2 justify-center">
                <Link to="/login" className="btn btn-lg btn-dark rounded-pill px-8 py-2">Login</Link>
                <Link to="/register" className="btn btn-lg btn-outline-secondary rounded-pill">Create Account</Link>
            </div>
        }
    </div>
    </>
  )
}

export default HomeSection