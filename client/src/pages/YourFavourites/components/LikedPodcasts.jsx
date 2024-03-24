import { Button, Img } from "components"
import PodcastCard from "components/shared/PodcastCard"
import { useAxios } from "hooks"
import { useEffect } from "react"
import { Spinner } from "react-bootstrap"

const LikedPodcasts = () => {

  const { call, data, loading } = useAxios({
    url: "/api/podcast/like/",
    method: "GET"
  })

  useEffect(() => {call()}, [])
  
  return (
    <div className="">
      <div className="flex">
        <Button color="gray_300" size="7xl" className="w-[76px]">
          <Img src="assets/img_podcast_1.svg" />
        </Button>
        <div className="flex flex-col mx-2 my-auto">
          <h4 className="text-3xl font-bold text-gray-600_01">Podcasts You have liked</h4>
        </div>
      </div>



        { loading && <Spinner /> }

        <div className="row">
          {
            data.map(podcast => {
              const { id, title, podcast_owner, cover_image } = podcast;
              console.log(cover_image)
              return (
                <PodcastCard   
                  id={id}
                  title={title}
                  author={podcast_owner}
                  imgSrc={cover_image}
                  />
                )
            })
          }
      </div>
    </div>
  )
}

export default LikedPodcasts
