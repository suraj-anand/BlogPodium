import axios from "axios";
import BlogCard from "components/shared/BlogCard";
import { useAxios } from "hooks"
import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap";

const SearchedBlogs = ({  query } ) => {

    const [ blogs, setBlogs ] = useState([]); 
    const [ loadMore, setLoadMore ] = useState("");
    const [ loading, setLoading ] = useState(false);
  
    async function fetchBlogs(url=""){
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
      setBlogs([])
      fetchBlogs(`/api/blog/?query=${query}`);
    }, [query])

    if (loading) {
        return (<Spinner className="d-block mx-auto text-gray-600_01" />)
    }

    if (blogs?.length === 0){
        return (
            <p className="text-center text-2xl text-gray-500">Oops! No results found</p>
        )
    }

    return (
        <div className="container-fluid">
        {
            blogs.map(blog => {
                const { id, creation_time, cover_image, title, user_id, blog_owner, profile } = blog;
                return <div className="my-12">
                    <BlogCard 
                    id={id}
                    createdOn={creation_time}
                    coverImage={cover_image}
                    title={title}
                    blogOwnerId={user_id}
                    author={blog_owner}
                    profileImageSrc={profile}
                    showLike={false}
                />
                <div className="my-12"><hr /></div>
                </div>
            })
        }

        {
            (loadMore) && (
                <div className="flex items-center justify-center my-5">
                    <button className="w-72 btn btn-outline-dark p-3 text-lg rounded-full">Load More</button>
                </div>
            )
        }
        </div>
    )
}

export default SearchedBlogs