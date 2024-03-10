import { Button, Img } from "components"

const LikedPodcasts = () => {
  return (
    <div className="flex gap-2">
      <Button color="gray_300" size="7xl" className="w-[76px]">
        <Img src="assets/img_podcast_1.svg" />
      </Button>

      <div className="flex flex-col gap-1 my-auto">
        <h4 className="text-3xl font-bold text-gray-600_01">Podcasts You have liked</h4>
      </div>
    </div>
  )
}

export default LikedPodcasts