import { useEffect, useState } from "react";
import { formatDistance } from 'date-fns'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// Icons
import { IoMdHeartEmpty, IoMdHeart, IoMdArrowRoundBack  } from "react-icons/io";
import { FaShare } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { LiaChevronCircleDownSolid, LiaChevronCircleUpSolid, LiaTrashAltSolid  } from "react-icons/lia";

// Components
import { Fade, Spinner } from "react-bootstrap";
import Modal from "components/generic/Modal";
import { Img, ProfileImage } from "components"
import Overlay from "components/generic/Overlay";

// Misc
import { useAxios } from "hooks";
import { DEFAULT_BLOG_COVER_IMAGES as IMAGES } from 'utils/constants'
import { stringHash } from "utils/Helpers";

const BlogCard = ({
  id="",
  profileImageSrc="",
  author="",
  blogOwnerId="",
  title="",
  content="",
  coverImage,
  likes=[],
  createdOn="",
  showLike=false,
  showContent=false,
  showShare=true,
  showDelete=false,
  showEdit=false,
}) => {

  const [ showBlogContent, setShowBlogContent ] = useState(false);
  return (
    <>
      {/* Profile Image, Author, Posted Time  */}
      <div className="flex gap-2 mt-4">
        <ProfileImage userid={blogOwnerId} imgSrc={profileImageSrc} />
        <BlogHeader author={author} createdOn={createdOn} />
        <div className="flex gap-3 ms-auto my-auto">
          { showEdit && <EditBlogButton {...{id, content, title, blogOwnerId, }} />}  {/* Edit Button */}
          { showLike && <LikeBlog id={id} likes={likes} /> } {/* Like Button */}
          { showDelete && <DeleteBlog {...{id, title, blogOwnerId}} /> } {/* Delete Button */}
          { showShare && <ShareBlog id={id} />} {/* Share Button */}
        </div>
      </div>
      
      <BlogCoverImage title={title} coverImage={coverImage} /> {/* Cover Image */}

      {/* Title */}
      <div className={`flex items-center ${showContent ? "justify-between" : "justify-center"}`}>
        
        <BlogTitle id={id} title={title} showContent={showContent} />
        
        <button className="me-5 hover:text-gray-600_01" onClick={() => {setShowBlogContent(show => (!show))}}>
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

function BlogCoverImage({title, coverImage}){
  return (<div className="flex align-middle">
    <Img
        src={
          coverImage ? `${axios.defaults.baseURL}/api/media/?file=${coverImage}` : 
          `/${IMAGES.at(stringHash(title,IMAGES.length))}`
        }
        alt="image"
        className="mt-[10px] object-cover rounded-[5px]"
        style={{height: "250px", width: "100%"}}
      />
  </div>)
}

function BlogTitle({ id, title, showContent }){
  console.log(showContent)
  return (
    <div className={`text-gray-600_01 font-bold text-2xl font-merriweather italic mt-2 ${showContent && "container"}`}> 
      <Link to={`/blog/${id}`}>{title}</Link>
    </div>
  )
}

function LikeBlog({ id, likes=[] }){
  
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
      const response = await axios.post("/api/blog/like/", {
        "blog_id": id,
        "action": action
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button onClick={handleLike} className="hover:text-red-500">
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
    <button onClick={handleShare}> <FaShare size={26} className="hover:text-blue-400" /> </button>
  )
}

function Content({content, show}){

  return (
    <div className="container">
    <Fade in={show} appear={show} unmountOnExit={show}>
        <p className="my-3 fw-medium ">
          <span dangerouslySetInnerHTML={{__html: content}}></span>
        </p>
    </Fade>
    </div>
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
          <LiaTrashAltSolid size={36} className="hover:text-red-700" />
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

function EditBlogButton({ id, content, title, blogOwnerId }){
  
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  if (blogOwnerId !== userId){
    return <></>
  }

  const handleEditClick = () => {
    navigate(`/blog/${id}/edit/`, {
      state: {
        id: id,
        title: title,
        content: content,
        blogOwnerId: blogOwnerId
      }
    })
  }

  return (
    <>
      <button className="btn hover:text-blue-400" onClick={handleEditClick}>
        <BiSolidEdit size={36} />
      </button>
    </>
  )
}

export default BlogCard