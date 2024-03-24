import axios from "axios";
import { useState } from "react";
import { BiSkipNextCircle, BiSkipPreviousCircle  } from "react-icons/bi";
import { FaShare } from "react-icons/fa";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { PiArrowBendDownRightBold, PiArrowBendUpLeftBold  } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PodcastNavbar = ({
    id,
    next, title, prev,
    showLike=true, 
    showShare=true,
    likes=[],
}) => {

    const navigate = useNavigate();

    return (
        <nav className="navbar p-2">
            <div className="w-100 absolute -z-50 ">
                {title}
            </div>
            <div className="container py-2">
                
                <div className="flex">
                    <Link title="play next" to={`/podcast/${next}`}>
                        {next && <PiArrowBendDownRightBold size={36} />}
                    </Link>
                </div>
                
                <div className="flex ms-auto gap-5">
                    
                    { showLike && <LikePodcast id={id} likes={likes} /> }
                    { showShare && <SharePodcast id={id} /> }

                    <button title="go back" onClick={() => {navigate(-1)}}>
                        { prev ? <BiSkipNextCircle size={36} /> : <PiArrowBendUpLeftBold size={36} /> }
                    </button>
                </div>

            </div>
        </nav>
    )
}

function SharePodcast({ id }){
  
    const handleShare = async () => {
      const blog_url = `${document.location.origin}/podcast/${id}`
      await navigator.share({
        url: blog_url
      });  
    }
  
    return (
      <button className="mx-2" title="share" onClick={handleShare}> <FaShare size={26} className="hover:text-blue-400" /> </button>
    )
}

function LikePodcast({ id, likes=[] }){
  
    const [liked, setLiked] = useState(() => {
      const user_id = localStorage.getItem("user_id");
      return likes.includes(user_id)
    });
  
    async function handleLike(){
      let action = "like";
      if (liked) {
        action = "unlike";
      }
      setLiked(like => (!like))
      // add api logic to like
      try {
        const response = await axios.post("/api/podcast/like/", {
          "podcast_id": id,
          "action": action
        })
      } catch (error) {
        console.log(error);
      }
    }
  
    return (
      <button onClick={handleLike} className="mx-2 hover:text-red-500">
        { liked ? <IoMdHeart size={36} className="text-red-500" /> : <IoMdHeartEmpty size={36} /> }
      </button>
    )
  }
  

export default PodcastNavbar;