import { Img, ProfileImage } from "components"
import { useEffect, useState } from "react";
import { formatDistance } from 'date-fns'
import { IoMdHeartEmpty, IoMdHeart, IoMdArrowRoundBack  } from "react-icons/io";
import { FaShare } from "react-icons/fa";
import { LiaChevronCircleDownSolid, LiaChevronCircleUpSolid, LiaTrashAltSolid  } from "react-icons/lia";
import { Fade, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "components/generic/Modal";
import { useAxios } from "hooks";
import Overlay from "components/generic/Overlay";

const BlogCard = ({
  id="",
  profileImageSrc="",
  author="",
  title="",
  content="",
  coverImage,
  createdOn="",
  showLike=false,
  showContent=false,
  showShare=true,
  showDelete=false,
  blogOwnerId=""
}) => {

  const [ showBlogContent, setShowBlogContent ] = useState(false);

  return (
    <>
      {/* Profile Image, Author, Posted Time  */}
      <div className="flex gap-2 mt-4">
        <ProfileImage imgSrc={profileImageSrc ? `${axios.defaults.baseURL}/api/media/?file=${profileImageSrc}` : ""} />
        <BlogHeader author={author} createdOn={createdOn} />
        <div className="flex gap-3 ms-auto my-auto">
          { showLike && <LikeBlog /> } {/* Like Button */}
          { showDelete && <DeleteBlog title={title} id={id} blogOwnerId={blogOwnerId} /> }
          { showShare && <ShareBlog id={id} />} {/* Share Button */}
        </div>
      </div>
      
      <BlogCoverImage coverImage={coverImage} /> {/* Cover Image */}

      {/* Title */}
      <div className={`flex items-center ${showContent ? "justify-between" : "justify-center"}`}>
        
        <BlogTitle id={id} title={title} />
        
        <button className="btn" onClick={() => {setShowBlogContent(show => (!show))}}>
          {showContent &&  showBlogContent && <LiaChevronCircleUpSolid size={30} /> }
          {showContent &&  !showBlogContent && <LiaChevronCircleDownSolid size={30} /> }
        </button>
      </div>

      {/* Content */}
      {
        (showContent && showBlogContent) && <Content content={content} show={showBlogContent} />
      }
    </>
  )
}


function BlogHeader({author, createdOn}){
  return (
    <div className="flex flex-col my-auto gap-1">
      <h4 className="font-semibold">By {author}</h4>
      <h5> { createdOn ? formatDistance(new Date(createdOn), new Date(), { addSuffix: true }) : "3 Days ago" } </h5>
    </div>
  )
}

function BlogCoverImage({coverImage}){
  return (<div className="flex align-middle">
    <Img
        src={coverImage ? `${axios.defaults.baseURL}/api/media/?file=${coverImage}` : ""}
        alt="image"
        className="mt-[10px] object-cover rounded-[5px]"
        style={{height: "250px", width: "100%"}}
      />
  </div>)
}

function BlogTitle({ id, title }){
  return (
    <div className={`text-gray-600_01 font-bold text-2xl font-merriweather italic mt-2`}> 
      <Link to={`/blog/${id}`}>{title}</Link>
    </div>
  )
}

function LikeBlog(){
  
  const [liked, setLiked] = useState(false);

  function handleLike(){
    setLiked(like => (!like))
    // add api logic to like
  }

  return (
    <button onClick={handleLike}>
      { liked ? <IoMdHeart size={36} className="text-red-500" /> : <IoMdHeartEmpty size={36} /> }
    </button>
  )
}


function ShareBlog({id}){
  
  const handleShare = async () => {
    const blog_url = `${document.location.origin}/blog/${id}`
    await navigator.share({
      url: blog_url
    });  
  }

  return (
    <button onClick={handleShare}> <FaShare size={26} /> </button>
  )
}

function Content({content, show}){

  return (
    <Fade in={show} appear={show} unmountOnExit={show}>
        <p className="my-3 fw-medium ">
          <span dangerouslySetInnerHTML={{__html: content}}></span>
        </p>
    </Fade>
  )
}


function DeleteBlog({id, title, blogOwnerId}) {
  
  const userId = localStorage.getItem("user_id");

  const navigate = useNavigate();
  const { loading, error, status_code, call } = useAxios({
    method: "DELETE",
    url: `/api/blog/${id}`
  })

  const handleDelete = () => {
    call();
  }

  useEffect(() => {
    if([200, 201, 202, 204].includes(status_code)){
      navigate("/");
    }
  }, [status_code]);

  if ( blogOwnerId === userId ){
    return (
      <>
        {
         loading && 
          <Overlay> 
            <div className="flex flex-col items-center">
            <p className="text-lg my-2">Hold on for a moment please, your blog is being deleted.</p>
            <Spinner />
            </div>
          </Overlay>
        }

        {
          error &&  
          <Overlay> 
              <p className="text-2xl text-red-700">Oops! Something went wrong on blog deletion.</p>
          </Overlay>
        }

        <button className="btn" data-bs-toggle="modal" data-bs-target="#generic-modal">
          <LiaTrashAltSolid size={36} className="text-red-700" />
        </button>

        <Modal 
          title={"Blog Delete Confirmation"}
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
          Are you sure to delete your blog <span className="font-bold">{title} </span>

        </Modal>
      </>
    )
  }
}

export default BlogCard