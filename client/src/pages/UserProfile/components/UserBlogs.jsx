import { useEffect, useState } from "react"
import { Button } from "components"
import BlogCard from "components/shared/BlogCard"
import { Spinner } from "react-bootstrap"
import { RxPencil2 } from "react-icons/rx"
import { CgSmileSad } from "react-icons/cg";
import axios from "axios"
import { useParams } from "react-router-dom"

const UserBlogs = ({name}) => {

    const { userid } = useParams();

    const [ blogs, setBlogs ] = useState([]); 
    const [ loadMore, setLoadMore ] = useState("");
    const [ loading, setLoading ] = useState(false);

    async function fetchBlogs(url=`/api/blog/?user_id=${userid}`){
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
        <div className="container">
            <div className="flex align-bottom gap-3">
                <Button color="gray_300" size="6xl" className="w-[76px]">
                    <RxPencil2 size={48} />
                </Button>
                <div className="flex flex-col gap-1 my-auto">
                    <h4 className="text-3xl font-bold text-gray-600_01">{name} Blogs</h4>
                </div>
            </div>

            <div className="p-3">
                { 
                loading ? <Spinner /> :
                <>
                {
                    blogs.map(blog => {
                        const { id, cover_image, user_id, blog_owner, creation_time, profile } = blog;
                        return (
                            <BlogCard 
                                id={id}
                                title={blog?.title}
                                author={blog_owner}
                                blogOwnerId={user_id}
                                coverImage={cover_image}
                                profileImageSrc={profile}
                                createdOn={creation_time}
                            />
                        )
                    })
                }
                {
                    blogs.length === 0 && 
                    <p className="text-xl flex items-center gap-2 justify-start px-3">
                        <CgSmileSad size={24} className="text-yellow-700" />
                        {name} has got no blogs.</p>
                }

                
                <div className='text-center my-3'>
                    { loadMore && <button className='btn btn-outline-info rounded-lg' onClick={handleLoadMore}>Load more</button> }
                </div>
                </>
            }
            </div>
        </div>
    )
}

export default UserBlogs