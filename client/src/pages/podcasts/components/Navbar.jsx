import { BiSkipNextCircle, BiSkipPreviousCircle  } from "react-icons/bi";
import { PiArrowBendDownRightBold, PiArrowBendUpLeftBold  } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = ({ next, title, prev }) => {

    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="container">
                <div className="w-100 flex justify-between my-2">
                    
                    <Link title="play next" to={`/podcast/${next}`}>
                        {next && <PiArrowBendDownRightBold size={36} />}
                    </Link>
                    
                    {title}
                    
                    <button title="go back" onClick={() => {navigate(-1)}}>
                        { prev ? <BiSkipNextCircle size={36} /> : <PiArrowBendUpLeftBold size={36} /> }
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;