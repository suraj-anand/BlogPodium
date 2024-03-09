import { useEffect } from "react"
import { Button } from "components"
import BlogCard from "components/shared/BlogCard"
import { useAxios } from "hooks"
import { Spinner } from "react-bootstrap"
import { RxPencil2 } from "react-icons/rx"
import { CgSmileSad } from "react-icons/cg";

const YourBlogs = () => {

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
                { 
                loading ? <Spinner /> :
                <>
                {
                    data.map(blog => {
                        const { id, content, cover_image, user_id, blog_owner, creation_time, profile } = blog;
                        return (
                            <BlogCard 
                                id={id}
                                title={blog?.title}
                                author={blog_owner}
                                blogOwnerId={user_id}
                                content={content}
                                coverImage={cover_image}
                                profileImageSrc={profile}
                                createdOn={creation_time}
                                showContent={true}
                                showLike={true}
                                showDelete={true}
                                showEdit={true}
                                />
                        )
                    })
                }
                {
                    data.length === 0 && 
                    <p className="text-xl flex items-center gap-2 justify-start px-3">
                        <CgSmileSad size={24} className="text-yellow-700" />
                        Oops! You have got no blogs</p>
                }
                </>
                }
            </div>
        </div>
    )
}

export default YourBlogs