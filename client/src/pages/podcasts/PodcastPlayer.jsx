import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Fade, Spinner } from "react-bootstrap";
import ReactAudioPlayer from 'react-audio-player';
import _ from "lodash";
import ReactPlayer from 'react-player/lazy'
import axios from "axios";
import { Img } from "components";
import { stringHash } from "utils/Helpers";
import { DEFAULT_BLOG_COVER_IMAGES as IMAGES } from "utils/constants";
import { useAxios } from "hooks";
import PodcastNavbar from "./components/PodcastNavbar"
import "./styles.css"

// Icons
import { FaRegCirclePause } from "react-icons/fa6";


const PodcastPlayer = ({ showNext=false }) => {
    
    const { podcastid } = useParams();

    const {
        data,
        loading,
        call,
    } = useAxios({
        method: "GET",
        url: `/api/podcast/${podcastid}`
    });

    const [ podcastIDs, setPodcastIDs ] = useState([]);
    const [ podcast, setPodcast ] = useState({});
    
    useEffect(() => {
      call();
      (async () => {
        try {
            const response = await axios.get("/api/podcast/?type=simple");
            if (response.data?.results) {
                setPodcastIDs(response.data?.results)
            }
        } catch (error) {
            console.log(error)
        }
      })();
    }, [podcastid])

    useEffect(() => {
        setPodcast(data)
    }, [data])
    

    if (loading) {
        return (
            <div className="flex vh-100 items-center justify-center">
                <Spinner />
            </div>
        )
    }

    if (!loading && _.isEmpty(podcast)){
        return (
            <div className="flex vh-100 items-center justify-center">
                <p className="text-xl">Invalid Podcast</p>
            </div>
        )
    }

    const {
        id,
        title,
        cover_image,
        podcast_owner,
        user_id,
        type,
        podcast: _podcast,
        likes
    } = podcast;

    const podcast_url = `${axios.defaults.baseURL}/api/media/?file=${_podcast}`
    const nextIdx = podcastIDs.findIndex(e => e === podcastid) + 1;
    const next = podcastIDs.at(nextIdx % podcastIDs.length);

    return (
        <>
        <PodcastNavbar
            id={id}
            likes={likes}
            next={next}
            title={title}
            titleComponent={
                <div className="flex flex-col items-center mx-auto">
                    <h3 className="text-xl fw-bold ">{title}</h3>
                    <h6 className="italic">By {podcast_owner}</h6>
                </div>
            } 
            ownerId={user_id}
            />


        {
            type === "audio" &&
                <AudioPlayer 
                    cover_image={cover_image}
                    podcast_url={podcast_url}
                    />
        }
        
        {
            type === "video" &&
                <VideoPlayer 
                    podcast_url={podcast_url}
                    />
        }
        </>
    )
}


function AudioPlayer({ 
    cover_image, 
    podcast_url 
}){
    
    const [ pause, setPause ] = useState(false);
    
    return (
        <>
            {/* Audio Podcast */}
            {/* Background Image */}
            <div className="w-100 absolute z-100 flex items-center justify-center z-10"
                onClick={() => {setPause(pause => (!pause))}}
                >

                <Fade in={pause} appear={pause} unmountOnExit={pause}>
                    <FaRegCirclePause size={72} className="absolute text-white" />
                </Fade>

                <Img
                    src={
                        cover_image ? `${axios.defaults.baseURL}/api/media/?file=${cover_image}` : 
                    `/${IMAGES.at(stringHash(podcastid, IMAGES.length))}`
                    }
                    alt="image"
                    className="h-[85vh] p-2 object-cover rounded-xl"
                />
            </div>

            {/* Particles */}
            <div className="h-[85vh] w-100 absolute z-20"
                onClick={() => {setPause(pause => (!pause))}}>
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
                <div className="absolute z-30" style={{bottom: 15}}>
                    <ReactPlayer
                        className="react-player"
                        autoPlay={true}
                        controls={true}
                        playing={!pause}
                        url={podcast_url}                    
                        />
                </div>
            </div>
        </>
    )
}

function VideoPlayer({
    podcast_url
}){
    return (
        <>
            <div className="flex items-center justify-center h-[85vh]">
                <ReactPlayer
                    className="react-player"
                    autoPlay={true}
                    controls={true}
                    url={podcast_url}                    
                    />
            </div>
        </>
    )
}

export default PodcastPlayer