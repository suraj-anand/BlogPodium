import { Button, Img } from 'components'
import BlogCard from 'components/shared/BlogCard';
import React from 'react'
import { RxPencil2 } from "react-icons/rx";

const TrendingBlogs = () => {
  return (
    <div className='container my-16'>
        {/* Header  */}
        <div className="flex align-bottom gap-3">
            <Button color="gray_300" size="7xl" className="w-[76px]">
                <RxPencil2 size={48} />
            </Button>
            <div className="flex flex-col gap-1 my-auto">
                <h4 className="text-3xl font-bold text-gray-600_01">Trending Blogs</h4>
                <p className="font-semibold text-blue_gray-600">Get insights from the trending blogs</p>
            </div>
        </div>

        <BlogCard 
          profileImageSrc="images/img_ellipse_5.png"
          author='Jayakumar N' 
          title='Consistent way of working to train yourself'
          coverImage={"images/img_rectangle_11_390x728.png"}
          />

        <BlogCard 
          profileImageSrc="images/img_ellipse_5.png"
          author='Jayakumar N' 
          title='Consistent way of working to train yourself'
          coverImage={"images/img_rectangle_11_390x728.png"}
          />
    </div>
  )
}

export default TrendingBlogs