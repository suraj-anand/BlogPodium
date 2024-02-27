import { NavLink } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";

const Navbar = ({}) => {
    return (
        <nav class="navbar my-2">
            <div class="container">
                            
                {/* Icon */}
                <div className="w-100 d-flex justify-content-center">

                    <div className='flex-item me-auto'>
                        <h1 className='text-2xl font-bold uppercase'>Blog Podium</h1>
                    </div>

                    <div className="d-none d-lg-flex gap-5 flex-item nav-items">
                        <NavLink to="/" className="text-lg font-bold text-gray-600_01">Home</NavLink>
                        <NavLink to="/podcast" className="text-lg font-bold text-gray-600_01">Podcast</NavLink>
                        <NavLink to="/blog" className="text-lg font-bold text-gray-600_01">Blog</NavLink>
                        <NavLink to="/about" className="text-lg font-bold text-gray-600_01">About</NavLink>
                    </div>

                    {/* Search */}
                    <div className="flex-item ms-auto">
                        <button><IoIosSearch fontSize={36} /></button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;