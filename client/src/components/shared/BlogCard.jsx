import { Img, ProfileImage } from "components"
import { useState } from "react";
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaShare } from "react-icons/fa";

const BlogCard = ({
  profileImageSrc="",
  author="",
  title="",
  content="",
  coverImage
}) => {

  const [liked, setLiked] = useState(false);

  function handleLike(){
    setLiked(like => (!like))
  }

  return (
    <>
      {/* Profile Image, Author, Posted Time  */}
      <div className="flex gap-2 mt-4">
      <ProfileImage imgSrc={profileImageSrc} />
        <div className="flex flex-col my-auto gap-1">
          <h4 className="font-semibold">By {author}</h4>
          <h5>{formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true })}</h5>
        </div>

        <div className="flex gap-3 ms-auto my-auto">
          {/* Like Button */}
          <button onClick={handleLike}>
            { liked ? <IoMdHeart size={36} className="text-red-500" /> : <IoMdHeartEmpty size={36} /> }
          </button>

          {/* Share Button */}
          <button>
            <FaShare size={26} />
          </button>
        </div>

      </div>
      
      {/* Cover Image */}
      <div className="flex align-middle">
        <Img
            src={coverImage}
            alt="image"
            className="mt-[10px] object-cover rounded-[5px]"
            style={{height: "250px", width: "100%"}}
          />
      </div>

      {/* Title */}
      <h2 className="text-gray-600_01 font-bold text-2xl font-merriweather italic text-center mt-2">
        {title}
      </h2>

      {/* Summary */}
      <p className="my-3 fw-medium ">
        <span dangerouslySetInnerHTML={{__html: content}}></span>
      </p>
    </>
  )
}

export default BlogCard