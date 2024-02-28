import { Button, Img } from 'components'
import React from 'react'
import { RxPencil2 } from "react-icons/rx";

const TrendingBlogs = () => {
  return (
    <div className='container my-16'>
        {/* Trending Blogs  */}
        <div className="flex align-bottom gap-6">
            <Button color="gray_300" size="7xl" className="w-[76px]">
                <RxPencil2 size={48} />
            </Button>
            <div className="flex flex-col gap-2">
                <h4 className="text-3xl font-bold text-gray-600_01">Trending Blogs</h4>
                <p className="font-semibold text-blue_gray-600">Get insights from the trending blogs</p>
            </div>
        </div>
    </div>
  )
}

export default TrendingBlogs