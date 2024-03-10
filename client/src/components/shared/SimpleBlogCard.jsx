import axios from "axios"
import { Img, ProfileImage } from "components"
import { NavLink } from "react-router-dom"
import { stringHash } from "utils/Helpers"
import { DEFAULT_BLOG_COVER_IMAGES as IMAGES } from "utils/constants"

const SimpleBlogCard = ({ 
    id="",
    profileImageSrc="",
    author="",
    title="",
    coverImage,
    user_id,
}) => {
  return (
    <>
    <div className="col-12 col-md-6 col-lg-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg">
        <div className="flex flex-col items-start ">
            <div className="flex align-middle">
                <Img
                    src={coverImage ? `${axios.defaults.baseURL}/api/media/?file=${coverImage}` : `/${IMAGES.at(stringHash(title,IMAGES.length))}`} 
                    alt="cover-image"
                    className="object-cover rounded-[5px]"
                    style={{height: "250px", width: "450px"}}
                    />
            </div>

            <div className="flex items-center gap-2 p-2 text-xl font-medium text-gray-900 dark:text-white ">
                <ProfileImage userid={user_id} size={24} style={{maxWidth: "30px", maxHeight: "30px"}} imgSrc={profileImageSrc} />            
                {author}
            </div>
            
            <div className="w-100 flex items-center justify-center flex-col">
                <p className="text-center text-md text-gray-500 dark:text-gray-400 px-2">
                    {title.substring(0, 30)}.
                </p>
            </div>
            <div className="flex mx-auto">
                <NavLink to={`/blog/${id}`} className="my-2 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    View Blog
                </NavLink>
            </div>
        </div>
    </div>
    </>
  )
}

export default SimpleBlogCard