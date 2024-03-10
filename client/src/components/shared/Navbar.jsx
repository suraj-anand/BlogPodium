import { NavLink } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import { Offcanvas } from 'components/shared/Offcanvas';
import Back from 'components/mini/Back';

const Navbar = ({ showOptions=true, type="search", handleSearchClick = () => {} }) => {
    return (
        <nav className="navbar my-2 py-3">
            <div className="container">
                            
                {/* Icon */}
                <div className="w-100 d-flex justify-content-center">

                    <div className='flex-item me-auto'>
                        <button type="button" data-bs-toggle="offcanvas" data-bs-target="#side-drawer"  className='text-2xl font-bold uppercase'>Blog Podium</button>
                        <Offcanvas id="side-drawer" />
                    </div>

                    {
                        showOptions &&
                        <div className="d-none d-lg-flex gap-5 flex-item nav-items">
                            <NavLink to="/" className="text-lg font-bold text-gray-600_01">Home</NavLink>
                            <NavLink to="/podcast" className="text-lg font-bold text-gray-600_01">Podcast</NavLink>
                            <NavLink to="/blog" className="text-lg font-bold text-gray-600_01">Blog</NavLink>
                            <NavLink to="/about" className="text-lg font-bold text-gray-600_01">About</NavLink>
                        </div>
                    }

                    {/* Search */}
                    <div className="flex-item ms-auto">
                    {
                        type === "search" &&
                            <button onClick={handleSearchClick}><IoIosSearch fontSize={36} /></button>
                        }

                    {/* Back */}
                    {
                        type === "back" &&
                            <Back />
                    }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;