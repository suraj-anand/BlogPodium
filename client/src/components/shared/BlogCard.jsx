import { Img, ProfileImage } from "components"
import { useState } from "react";
import { formatDistance } from 'date-fns'
import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaShare } from "react-icons/fa";
import { LiaChevronCircleUpSolid } from "react-icons/lia";
import { LiaChevronCircleDownSolid } from "react-icons/lia";
import { Accordion, Fade } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const BlogCard = ({
  id="",
  profileImageSrc="",
  author="",
  title="",
  content="",
  coverImage,
  createdOn="",
  showLike=false,
  showContent=false
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
          { <ShareBlog id={id} />} {/* Share Button */}
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
        src={coverImage}
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

export default BlogCard