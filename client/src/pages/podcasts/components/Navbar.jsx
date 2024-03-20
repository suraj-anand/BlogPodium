import { BiSkipNextCircle, BiSkipPreviousCircle  } from "react-icons/bi";
import { PiArrowBendDownRightBold, PiArrowBendUpLeftBold  } from "react-icons/pi";

const Navbar = ({ next, title, prev }) => {
    return (
        <nav className="navbar">
            <div className="container">
                <div className="w-100 flex justify-between my-2">
                    <button>
                        {next ? <BiSkipPreviousCircle  size={36} /> : <PiArrowBendDownRightBold size={36} />}
                    </button>
                    <h4 className="my-auto">{title}</h4>
                    <button>
                        { prev ? <BiSkipNextCircle size={36} /> : <PiArrowBendUpLeftBold size={36} /> }
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;