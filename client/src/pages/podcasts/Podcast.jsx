import Navbar from "components/shared/Navbar"
import { useParams } from "react-router-dom"
import ReactAudioPlayer from 'react-audio-player';
import "./styles.css"
import { Img } from "components";
import axios from "axios";
import { stringHash } from "utils/Helpers";
import { DEFAULT_BLOG_COVER_IMAGES as IMAGES } from "utils/constants";

const Podcast = ({ coverImage }) => {
    
    const { podcastid } = useParams();

    return (
        <>
        <Navbar type="back" />

        {/* Background Image */}
        <div className="absolute h-[83vh] w-100 flex items-center justify-center z-0">
            <Img
                src={
                coverImage ? `${axios.defaults.baseURL}/api/media/?file=${coverImage}` : 
                `/${IMAGES.at(stringHash("abc",IMAGES.length))}`
                }
                alt="image"
                className="absolute max-h-full object-cover w-100 rounded-[5px]"
            />
        </div>

        {/* Particles */}
        <div className="h-[80vh] w-100 absolute z-10">
            <div className="squares">
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
            </div>
            <div className="grey"></div>
        </div>


        <div className="flex items-center justify-center">
            <div className="absolute" style={{bottom: 20}}>
                <ReactAudioPlayer
                    src="my_audio_file.ogg"
                    autoPlay
                    controls
                    />
            </div>
        </div>

        </>
    )
}

export default Podcast