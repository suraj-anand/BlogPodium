import { Button } from "components"
import SimpleBlogCard from "components/shared/SimpleBlogCard"
import { useAxios } from "hooks"
import { useEffect } from "react"
import { Spinner } from "react-bootstrap"
import { RxPencil2 } from "react-icons/rx"

const LikesBlogs = () => {

  const { call, data, loading } = useAxios({
    url: "/api/blog/like/",
    method: "GET"
  })

  useEffect(() => {call()}, [])


  return (
    <>
    <div className="flex gap-2">
      <Button color="gray_300" size="7xl" className="w-[76px]">
        <RxPencil2 size={48} />
      </Button>

      <div className="flex flex-col gap-1 my-auto">
        <h4 className="text-3xl font-bold text-gray-600_01">Blogs You have liked</h4>
      </div>
    </div>

    { loading && <Spinner /> }
    <div className="row justify-center gap-3 p-3">
      {
        data.map(blog => {
          const { id, creation_time, cover_image, title, profile, blog_owner, user_id } = blog;
          return (
            <>
            <SimpleBlogCard 
              id={id}
              title={title}
              author={blog_owner}
              coverImage={cover_image}
              user_id={user_id}
              profileImageSrc={profile}
                />
            </>
            )
        })
      }
    </div>
    </>
  )
}

export default LikesBlogs