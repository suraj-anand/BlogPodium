import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Modal from "components/generic/Modal";
import Overlay from "components/generic/Overlay";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { BiSkipNextCircle  } from "react-icons/bi";
import { FaShare } from "react-icons/fa";
import { IoMdArrowRoundBack, IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { PiArrowBendDownRightBold, PiArrowBendUpLeftBold, PiDotsThreeVerticalBold  } from "react-icons/pi";
import { useAxios } from "hooks";
import { LiaTrashAltSolid } from "react-icons/lia";

const PodcastNavbar = ({
    id,
    next, title, titleComponent, prev,
    showLike=true, 
    showShare=true,
    showDelete=true,
    ownerId="",
    likes=[],
}) => {

    const navigate = useNavigate();

    return (
        <nav className="navbar p-2">
            <div className="w-100 absolute -z-50 ">
                {titleComponent}
            </div>
            <div className="container py-2">
                
                <div className="flex">
                    <Link title="play next" to={`/podcast/${next}`}>
                        {next && <PiArrowBendDownRightBold size={36} />}
                    </Link>
                </div>
                


                <div className="flex ms-auto gap-5 dropdown">

                    <button type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" >
                        <PiDotsThreeVerticalBold className="fw-bolder text-lg" size={36} />
                    </button>

                    <ul className="dropdown-menu">
                      
                      { showLike &&  <LikePodcast id={id} likes={likes} /> }
                      <li><hr className="dropdown-divider" /></li>

                      { showShare && <SharePodcast id={id} /> }
                      <li><hr className="dropdown-divider" /></li>

                      { showDelete && <DeletePodcast id={id} podcastOwnerId={ownerId} title={title} /> }

                    </ul>
                    
                    
                    

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
      <li className="dropdown-item fw-bold hover:text-blue-400" onClick={handleShare}>
        <div className="flex items-center justify-center gap-2 ">
          <FaShare size={26} className="hover:text-blue-400" />
          <span>Share</span>
        </div>
      </li>
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
      <li onClick={handleLike} className="dropdown-item hover:text-red-500">
        <div className="flex items-center justify-center gap-2 fw-bold">
          <span>{ liked ? <IoMdHeart size={36} className="text-red-500" /> : <IoMdHeartEmpty size={36} /> }</span>
          { liked ? <span>Unlike</span> : <span>Like</span>}
        </div>
      </li>
    )
}
  

function DeletePodcast({id, title, podcastOwnerId}) {
  
  const userId = localStorage.getItem("user_id");

  const navigate = useNavigate();
  const { loading, error, status_code, call } = useAxios({
    method: "DELETE",
    url: `/api/podcast/${id}`
  })

  const handleDelete = () => {
    call();
  }

  useEffect(() => {
    if([200, 201, 202, 204].includes(status_code)){
      navigate("/");
    }
  }, [status_code]);


  if ( podcastOwnerId === userId ){
    return (
      <>
        {
         loading && 
          <Overlay> 
            <div className="flex flex-col items-center">
            <p className="text-lg my-2">Hold on for a moment please, your podcast is being deleted.</p>
            <Spinner />
            </div>
          </Overlay>
        }

        {
          error &&  
          <Overlay> 
              <p className="text-2xl text-red-700">Oops! Something went wrong on podcast deletion.</p>
          </Overlay>
        }

        
        <li className="dropdown-item flex items-center justify-center gap-2 fw-bold hover:text-red-700">
          <button className="" data-bs-toggle="modal" data-bs-target="#generic-modal">
            <LiaTrashAltSolid size={36} className="" />
          </button>
          <span>Delete</span>
        </li>

        <Modal 
          title={"Podcast Delete Confirmation"}
          closeName="Close"
          saveName="Delete"
          saveClass="flex btn-outline-danger"
          closeClass="flex btn-outline-secondary"
          saveIcon={<LiaTrashAltSolid size={24} className="text-red-700" />}
          closeIcon={<IoMdArrowRoundBack size={24} className="text-secodary" />}
          handleSave={handleDelete}
          >

          <p className="text-xl">
            Hey {localStorage.getItem("user_name")} !
          </p>
          Are you sure to delete your podcast <span className="font-bold">{title} </span>

        </Modal>
      </>
    )
  }
}

export default PodcastNavbar;