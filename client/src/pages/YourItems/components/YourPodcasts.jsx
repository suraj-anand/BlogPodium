import { useEffect } from "react"
import { Button } from "components"
import { useAxios } from "hooks"
import { Spinner } from "react-bootstrap"
import { RxPencil2 } from "react-icons/rx"
import { CgSmileSad } from "react-icons/cg";
import PodcastCard from "components/shared/PodcastCard"

const YourPodcasts = () => {

    const {
        data,
        loading,
        call
    } = useAxios({
        method: "GET",
        url: "/api/podcast/user-podcasts/"
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
                    <h4 className="text-3xl font-bold text-gray-600_01">Your Podcasts</h4>
                </div>
            </div>

            <div className="p-3 flex gap-3">
                { 
                loading ? <Spinner /> :
                <>
                {
                    data.map(podcast => {
                        const { id, title, cover_image, podcast_owner } = podcast;
                        return (
                            <PodcastCard 
                                key={id}
                                id={id}
                                title={title}
                                author={podcast_owner}
                                imgSrc={cover_image}
                                all={data}
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

export default YourPodcasts