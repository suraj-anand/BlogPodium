import Navbar from "./components/Navbar"
import { useParams } from "react-router-dom"
import ReactAudioPlayer from 'react-audio-player';
import "./styles.css"
import { Img } from "components";
import axios from "axios";
import { stringHash } from "utils/Helpers";
import { DEFAULT_BLOG_COVER_IMAGES as IMAGES } from "utils/constants";


const PodcastPlayer = ({ coverImage }) => {
    
    const { podcastid } = useParams();

    return (
        <>
        <Navbar title={podcastid} />

        {/* Background Image */}
        <div className="w-100 absolute z-100 flex items-center justify-center z-10">
            <Img
                src={
                coverImage ? `${axios.defaults.baseURL}/api/media/?file=${coverImage}` : 
                `/${IMAGES.at(stringHash(podcastid, IMAGES.length))}`
                }
                alt="image"
                className="h-[85vh] p-2 object-cover rounded-xl"
            />
        </div>

        {/* Particles */}
        <div className="h-[85vh] w-100 absolute z-20">
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
            <div className="absolute z-30" style={{bottom: 20}}>
                <ReactAudioPlayer
                    className="shadow-2"
                    src="my_audio_file.ogg"
                    autoPlay
                    controls
                    controlsList=""
                    />
            </div>
        </div>

        </>
    )
}

export default PodcastPlayer