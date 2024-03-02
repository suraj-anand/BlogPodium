import { Logo } from "components"
import { AuthContext } from "context/AuthContext";
import { useContext } from "react";
import { IoMdClose } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logout } from 'utils/Helpers'
// Icons
import { FaFilePen } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { GiSelfLove } from "react-icons/gi";
import { FaUserAlt } from "react-icons/fa";
import { useAxios } from "hooks";
import { NavLink } from "react-router-dom";
import "styles/index.css"

export const Offcanvas = ({id}) => {
    
    return (
    <div className="offcanvas offcanvas-start text-black-900 bg-gray-300 !w-[25%] sm:!w-[100%] " tabIndex="-1" id={id}>
        
        <div className="offcanvas-header flex justify-between">
            <Logo data-bs-dismiss="offcanvas" />
            <button data-bs-dismiss="offcanvas"><IoMdClose fontSize={32} /></button>
        </div>

        <div className="offcanvas-body">
            <Option 
                className=""
                title={"Write a blog"} 
                icon={<FaFilePen />}
                to="/write-blog" />

            <Option 
                className=""
                title={"Upload a Podcast"} 
                icon={<FaFilePen />}
                to="/upload-podcast" />

            <Option 
                className=""
                title={"Your Blogs & Podcasts"} 
                icon={<FaUserAlt />}
                to="/your-items" />

            <Option 
                className=""
                title={"Your Favourites"} 
                icon={<GiSelfLove />}
                to="/your-favourites" />
         </div>

         <div className="offcanvas-footer p-3">
            <LogoutBtn />
         </div>
    </div>
  )
}

export const Option = ({
    title, to, icon, className
}) => {

    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <button 
            onClick={() => navigate(to)}
            className={`btn ofc-btn w-100 flex items-center my-4 border-1 border-solid border-black hover:bg-gray-400 rounded ${(pathname === to) ? "active" : ""}`}
            data-bs-dismiss="offcanvas"
        >
            <div className={`flex gap-2 py-2 px-2 capitalize text-xl ${className}`}>
                    <span className="text-3xl">{icon}</span>
                    {title}
            </div>
        </button>
    )
}

export const LogoutBtn = () => {
    
    const { authStatus, setAuthStatus } = useContext(AuthContext);

    const { call } = useAxios({
        method: "POST",
        url: "/api/logout/"
    })
    
    function handleLogout(){
        Logout(setAuthStatus)
        call()
    }

    return (
        <>
        {
            authStatus && 
            <button className="ms-auto flex gap-2 btn btn-outline-dark" onClick={handleLogout}>
                <IoMdLogOut className="text-2xl font-bold" /> Logout
            </button>
        }
        </>
    )
}
