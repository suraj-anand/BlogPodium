import { Button, Img } from "components"
import PodcastCard from "components/shared/PodcastCard"
import { useAxios } from "hooks"
import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"

const LatestPodcasts = () => {

    const {
        data,
        loading,
        call,
    } = useAxios({
        method: "GET",
        url: "/api/podcast/"
    });

    const [ podcasts, setPodcasts ] = useState([]); 

    useEffect(() => {
        call()
    }, [])

    useEffect(() => {
        if(data?.results)
            setPodcasts((prev) => (data?.results.slice(0, 4)))
    }, [data])


    return (
        <div className="container my-2 my-lg-1">
            {/* Heading  */}
            <div className="flex align-bottom gap-3">
                <Button color="gray_300" size="7xl" className="w-[76px]">
                    <Img src="/assets/img_podcast_1.svg" />
                </Button>
                <div className="flex flex-col gap-1 my-auto">
                    <h4 className="text-3xl font-bold text-gray-600_01">Latest Podcasts</h4>
                    <p className="font-semibold text-blue_gray-600">Listen out  latest podcasts</p>
                </div>
            </div>

            {/* Podcast Cards */}
            <div className="row my-3">
                { loading && <Spinner className="block mx-auto my-3"/> }
                
                {
                    podcasts.map( (podcast, index) => {
                        const { id, cover_image, podcast: _podcast, title, podcast_owner } = podcast;
                        return (
                            <PodcastCard 
                                id={id}
                                imgSrc={cover_image}
                                title={title}
                                author={podcast_owner}
                                index={index}
                                all={podcasts.flatMap(e => e.id)}
                                />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default LatestPodcasts