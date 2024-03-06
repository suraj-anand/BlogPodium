import { useEffect } from "react"
import axios from 'axios'
import { Button } from "components"
import BlogCard from "components/shared/BlogCard"
import { useAxios } from "hooks"
import { Spinner } from "react-bootstrap"
import { RxPencil2 } from "react-icons/rx"

const UserBlogs = () => {

    const {
        data,
        error,
        loading,
        call
    } = useAxios({
        method: "GET",
        url: "/api/blog/user-blogs/"
    })


    useEffect(() => {
        call()
    }, [])

    useEffect(() => {
        console.log(data);
    }, [data])

    return (
        <div className="container">
            <div className="flex align-bottom gap-3">
                <Button color="gray_300" size="6xl" className="w-[76px]">
                    <RxPencil2 size={48} />
                </Button>
                <div className="flex flex-col gap-1 my-auto">
                    <h4 className="text-3xl font-bold text-gray-600_01">Your Blogs</h4>
                </div>
            </div>

            <div className="p-3">
                { loading && <Spinner /> }
                {
                    data.map(blog => {
                        const { id, content, cover_image, blog_owner, creation_time } = blog;
                        return (
                            <BlogCard 
                                id={id}
                                title={blog?.title}
                                author={blog_owner}
                                content={content}
                                coverImage={
                                    `${axios.defaults.baseURL}/api/media/?file=${cover_image}`
                                }
                                createdOn={creation_time}
                                showLike={true}
                                showContent={true}
                                />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default UserBlogs