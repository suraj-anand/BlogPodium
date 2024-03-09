import axios from 'axios';
import { Button, Img } from 'components'
import BlogCard from 'components/shared/BlogCard';
import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { RxPencil2 } from "react-icons/rx";

const TrendingBlogs = () => {

  const [ blogs, setBlogs ] = useState([]); 
  const [ loadMore, setLoadMore ] = useState("");
  const [ loading, setLoading ] = useState(false);

  async function fetchBlogs(url="/api/blog/"){
    setLoading(true);
    try {
      const response = await axios.get(url);
      if (response.data?.results){
        setBlogs(blogs => ([...blogs, ...response.data?.results]))
      }
      setLoadMore(response.data?.next);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleLoadMore(){
    const url = loadMore.replace("http:", location.protocol);
    fetchBlogs(url);
  }

  useEffect(() => {
    fetchBlogs();
  }, [])

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

      {
        blogs.map( (blog) => {
          const { id, creation_time, cover_image, title, blog_owner, profile, user_id } = blog;
          return (<BlogCard 
            id={id}
            title={title}
            createdOn={creation_time}
            author={blog_owner}
            blogOwnerId={user_id}
            profileImageSrc={profile}
            coverImage={cover_image}
            />)
          })
      }

      {
        loading &&
        <div className="flex items-center justify-center p-6">
          <Spinner />
        </div>
      }

      <div className='text-center my-3'>
        { loadMore && <button className='btn btn-outline-info rounded-lg' onClick={handleLoadMore}>Load more</button> }
      </div>
    </div>
  )
}

export default TrendingBlogs