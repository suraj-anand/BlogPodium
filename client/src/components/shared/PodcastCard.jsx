import axios from "axios"
import { Button, Img } from "components"
import { stringHash } from "utils/Helpers"
import { DEFAULT_PODCAST_IMAGES as IMAGES } from 'utils/constants'

const PodcastCard = ({
    imgSrc="",
    title="",
    author=""
}) => {
  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3 my-1 justify-center align-middle flex-nowrap relative">
        
        {/* Single Card */}
        <div className="bg-slate-200 rounded-xl shadow-lg hover:bg-slate-300 hover:scale-95">
            {/* Image & Play Button */}
            <div className="h-[207px] w-full mt-[7px] relative">
                <Img
                    src={ 
                        imgSrc ? `${axios.defaults.baseURL}/api/media/?file=${imgSrc}` :
                        `/${IMAGES.at(stringHash(title,IMAGES.length))}`
                    }
                    alt="image"
                    className="rounded-xl justify-center h-[207px] w-full left-0 bottom-0 right-0 top-0 m-auto object-cover absolute p-2"
                />
                <Button color="gray_600_01" className="w-[72px] top-[30%] right-0 left-0 m-auto absolute">
                    <Img src="assets/img_play.svg" />
                </Button>
            </div>

            {/* Podcast Title & Author */}
            <div className="px-1 pb-2 text-center">
                <h4 className="text-lg font-medium text-slate-500">{title.charAt(0).toUpperCase() + title.slice(1)}.</h4>
                <h4 className="text-sm text-slate-500">By {author.charAt(0).toUpperCase() + author.slice(1)}.</h4>
            </div>
        </div>
    </div>
  )
}

export default PodcastCard