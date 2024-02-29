import { Button, Img } from "components"
import PodcastCard from "components/shared/PodcastCard"

const LatestPodcasts = () => {
  return (
    <div className="container my-2 my-lg-1">
        {/* Heading  */}
        <div className="flex align-bottom gap-3">
            <Button color="gray_300" size="7xl" className="w-[76px]">
                <Img src="images/img_podcast_1.svg" />
            </Button>
            <div className="flex flex-col gap-1 my-auto">
                <h4 className="text-3xl font-bold text-gray-600_01">Latest Podcasts</h4>
                <p className="font-semibold text-blue_gray-600">Listen out  latest podcasts</p>
            </div>
        </div>

        {/* Podcast Cards */}
        <div className="row my-3">
            <PodcastCard imgSrc="" title="lorem ipsum" author="lorem"/>
            <PodcastCard imgSrc="" title="lorem ipsum" author="lorem"/>
            <PodcastCard imgSrc="" title="lorem ipsum" author="lorem"/>
            <PodcastCard imgSrc="" title="lorem ipsum" author="lorem"/>
        </div>
    </div>
  )
}

export default LatestPodcasts